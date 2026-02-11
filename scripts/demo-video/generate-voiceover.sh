#!/bin/bash
# Generate voiceover with Berto's cloned voice, ensuring no overlap
set -e

API_KEY="sk_6a4ddc2b29dd75f7c12046d25cd9162eefe320ed56083930"
VOICE_ID="EGueVV4CQIyLJALOZDVz"  # Berto's cloned voice
DIR="$(dirname "$0")"
AUDIO_DIR="$DIR/audio"
mkdir -p "$AUDIO_DIR"

# Scene start times in the Remotion video (seconds)
# Intro: 0-2.5s | Scene0: 2.5-5.5 | Scene1: 5.5-8.5 | Scene2: 8.5-10.5
# Scene3: 10.5-13.5 | Scene4: 13.5-17.5 | Scene5: 17.5-21 | Scene6: 21-25.5 | Outro: 25.5-28
SCENE_STARTS=(2.5 5.5 8.5 10.5 13.5 17.5 21.0)

declare -a TEXTS=(
  "So this is our Content Creator agent — you just tell it what you need."
  "Let's say I want a LinkedIn post about AI helping small businesses."
  "It starts working right away."
  "And just like that, we've got a full post ready to go."
  "But here's the cool part. You can highlight any text, and this little popover pops up."
  "So you can ask a specific question about just that section."
  "And it gives you a way better answer because it knows exactly what you're talking about. Pretty neat, right?"
)

GAP=0.3  # minimum gap between segments in seconds

echo "🎙️  Generating voiceover segments with Berto's voice..."

for i in "${!TEXTS[@]}"; do
  PADDED=$(printf "%02d" $i)
  OUTPUT="$AUDIO_DIR/segment_${PADDED}.mp3"

  echo "   🔊 Segment $i: ${TEXTS[$i]:0:60}..."

  curl -s "https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}" \
    -H "xi-api-key: ${API_KEY}" \
    -H "Content-Type: application/json" \
    -d "{
      \"text\": \"${TEXTS[$i]}\",
      \"model_id\": \"eleven_turbo_v2_5\",
      \"voice_settings\": {
        \"stability\": 0.65,
        \"similarity_boost\": 0.85,
        \"style\": 0.2,
        \"use_speaker_boost\": true
      }
    }" \
    --output "$OUTPUT"

  # Verify it's audio, not an error
  FILE_TYPE=$(file -b "$OUTPUT")
  if [[ "$FILE_TYPE" == *"JSON"* ]] || [[ "$FILE_TYPE" == *"ASCII"* ]]; then
    echo "   ❌ Error generating segment $i:"
    cat "$OUTPUT"
    rm "$OUTPUT"
    exit 1
  fi

  # Get duration
  DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUTPUT" 2>/dev/null)
  echo "   ✅ segment_${PADDED}.mp3 — ${DUR}s"
done

echo ""
echo "📐 Computing non-overlapping timeline..."

# Compute actual delay for each segment:
# Start at the scene start time, but if the previous segment hasn't finished, push it later
declare -a DELAYS=()
PREV_END=0

for i in "${!TEXTS[@]}"; do
  PADDED=$(printf "%02d" $i)
  DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$AUDIO_DIR/segment_${PADDED}.mp3" 2>/dev/null)

  # Desired start = scene start + small offset
  DESIRED_START=$(echo "${SCENE_STARTS[$i]} + 0.3" | bc)

  # Actual start = max(desired, prev_end + gap)
  EARLIEST=$(echo "$PREV_END + $GAP" | bc)
  if (( $(echo "$DESIRED_START >= $EARLIEST" | bc -l) )); then
    ACTUAL_START=$DESIRED_START
  else
    ACTUAL_START=$EARLIEST
    echo "   ⚠️  Segment $i pushed from ${DESIRED_START}s to ${ACTUAL_START}s to avoid overlap"
  fi

  DELAY_MS=$(echo "$ACTUAL_START * 1000" | bc | cut -d. -f1)
  DELAYS+=("$DELAY_MS")
  PREV_END=$(echo "$ACTUAL_START + $DUR" | bc)

  echo "   Segment $i: start=${ACTUAL_START}s  dur=${DUR}s  end=${PREV_END}s"
done

echo ""
echo "🎬 Combining segments with proper spacing..."

ffmpeg -y \
  -i "$AUDIO_DIR/segment_00.mp3" \
  -i "$AUDIO_DIR/segment_01.mp3" \
  -i "$AUDIO_DIR/segment_02.mp3" \
  -i "$AUDIO_DIR/segment_03.mp3" \
  -i "$AUDIO_DIR/segment_04.mp3" \
  -i "$AUDIO_DIR/segment_05.mp3" \
  -i "$AUDIO_DIR/segment_06.mp3" \
  -filter_complex "
    [0:a]adelay=${DELAYS[0]}|${DELAYS[0]},aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono[a0];
    [1:a]adelay=${DELAYS[1]}|${DELAYS[1]},aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono[a1];
    [2:a]adelay=${DELAYS[2]}|${DELAYS[2]},aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono[a2];
    [3:a]adelay=${DELAYS[3]}|${DELAYS[3]},aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono[a3];
    [4:a]adelay=${DELAYS[4]}|${DELAYS[4]},aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono[a4];
    [5:a]adelay=${DELAYS[5]}|${DELAYS[5]},aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono[a5];
    [6:a]adelay=${DELAYS[6]}|${DELAYS[6]},aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono[a6];
    [a0][a1][a2][a3][a4][a5][a6]amix=inputs=7:duration=longest:dropout_transition=0[mixed]
  " \
  -map "[mixed]" -ac 1 -ar 44100 \
  "$AUDIO_DIR/voiceover_combined.mp3" 2>/dev/null

echo "   ✅ Combined voiceover: $AUDIO_DIR/voiceover_combined.mp3"

# Check total duration
TOTAL_DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$AUDIO_DIR/voiceover_combined.mp3" 2>/dev/null)
echo "   Total audio duration: ${TOTAL_DUR}s"

echo ""
echo "🎬 Merging with Remotion video..."

VIDEO_INPUT="$DIR/../../video/out/feature-demo-silent.mp4"
FINAL_OUTPUT="$DIR/../../video/out/feature-demo.mp4"

ffmpeg -y \
  -i "$VIDEO_INPUT" \
  -i "$AUDIO_DIR/voiceover_combined.mp3" \
  -c:v copy -c:a aac -b:a 128k -shortest \
  "$FINAL_OUTPUT" 2>/dev/null

echo ""
echo "✅ Final video: $FINAL_OUTPUT"
ls -lh "$FINAL_OUTPUT"
echo ""
echo "🎉 Done! Voiceover uses Berto's cloned voice with no overlaps."
