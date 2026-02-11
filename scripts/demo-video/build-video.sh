#!/bin/bash
# Build a demo video from captured frames using ffmpeg
# Each frame gets a specific duration, with crossfade transitions

FRAMES_DIR="$(dirname "$0")/frames"
OUTPUT="$(dirname "$0")/demo-highlight-ask.mp4"

# Frame durations in seconds (matched to voiceover script)
# 000 empty_state:       3s
# 001 typing_complete:   3s
# 002 loading:           2s
# 003 response:          3s
# 004 highlight_popover: 4s  (key frame — show the feature)
# 005 popover_question:  3s
# 006 followup_sent:     2s
# 007 followup_response: 4s
# 008 final_top:         2s
# 009 final_bottom:      2s

FADE=0.5  # crossfade duration

ffmpeg -y \
  -loop 1 -t 3 -i "$FRAMES_DIR/frame_000_empty_state.png" \
  -loop 1 -t 3 -i "$FRAMES_DIR/frame_001_typing_complete.png" \
  -loop 1 -t 2 -i "$FRAMES_DIR/frame_002_loading.png" \
  -loop 1 -t 3 -i "$FRAMES_DIR/frame_003_response.png" \
  -loop 1 -t 4 -i "$FRAMES_DIR/frame_004_highlight_popover.png" \
  -loop 1 -t 3 -i "$FRAMES_DIR/frame_005_popover_question.png" \
  -loop 1 -t 2 -i "$FRAMES_DIR/frame_006_followup_sent.png" \
  -loop 1 -t 4 -i "$FRAMES_DIR/frame_007_followup_response.png" \
  -loop 1 -t 2 -i "$FRAMES_DIR/frame_008_final_top.png" \
  -loop 1 -t 2 -i "$FRAMES_DIR/frame_009_final_bottom.png" \
  -filter_complex "
    [0:v]scale=1280:800:force_original_aspect_ratio=decrease,pad=1280:800:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v0];
    [1:v]scale=1280:800:force_original_aspect_ratio=decrease,pad=1280:800:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v1];
    [2:v]scale=1280:800:force_original_aspect_ratio=decrease,pad=1280:800:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v2];
    [3:v]scale=1280:800:force_original_aspect_ratio=decrease,pad=1280:800:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v3];
    [4:v]scale=1280:800:force_original_aspect_ratio=decrease,pad=1280:800:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v4];
    [5:v]scale=1280:800:force_original_aspect_ratio=decrease,pad=1280:800:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v5];
    [6:v]scale=1280:800:force_original_aspect_ratio=decrease,pad=1280:800:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v6];
    [7:v]scale=1280:800:force_original_aspect_ratio=decrease,pad=1280:800:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v7];
    [8:v]scale=1280:800:force_original_aspect_ratio=decrease,pad=1280:800:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v8];
    [9:v]scale=1280:800:force_original_aspect_ratio=decrease,pad=1280:800:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v9];
    [v0][v1]xfade=transition=fade:duration=${FADE}:offset=2.5[x01];
    [x01][v2]xfade=transition=fade:duration=${FADE}:offset=5[x02];
    [x02][v3]xfade=transition=fade:duration=${FADE}:offset=6.5[x03];
    [x03][v4]xfade=transition=fade:duration=${FADE}:offset=9[x04];
    [x04][v5]xfade=transition=fade:duration=${FADE}:offset=12.5[x05];
    [x05][v6]xfade=transition=fade:duration=${FADE}:offset=15[x06];
    [x06][v7]xfade=transition=fade:duration=${FADE}:offset=16.5[x07];
    [x07][v8]xfade=transition=fade:duration=${FADE}:offset=20[x08];
    [x08][v9]xfade=transition=fade:duration=${FADE}:offset=21.5[out]
  " \
  -map "[out]" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
  "$OUTPUT"

echo ""
echo "✅ Video saved to: $OUTPUT"
echo "   Duration: ~28 seconds"
ls -lh "$OUTPUT"
