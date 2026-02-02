"use client";

import { LearnLayout, ChapterNavigation, CodeBlock } from "../components";

export default function StructuredOutputs() {
  return (
    <LearnLayout>
      <div className="mb-12">
        <p className="text-sm text-[#d4a574] font-medium mb-2">Chapter 15</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Structured Outputs
        </h1>
        <p className="text-lg text-[#a1a1a1] max-w-2xl">
          Return validated JSON from agent workflows using JSON Schema, Zod, or Pydantic. Get type-safe, structured data after multi-turn tool use.
        </p>
      </div>

      {/* Overview Section */}
      <div className="mb-12">
        <p className="text-[#a1a1a1] mb-4">
          Structured outputs let you define the exact shape of data you want back from an agent. The agent can use any tools it needs to complete the task, and you still get validated JSON matching your schema at the end. Define a JSON Schema for the structure you need, and the SDK guarantees the output matches it.
        </p>
        <p className="text-[#a1a1a1]">
          For full type safety, use <span className="text-[#d4a574]">Zod</span> (TypeScript) or <span className="text-[#d4a574]">Pydantic</span> (Python) to define your schema and get strongly-typed objects back.
        </p>
      </div>

      {/* Why Structured Outputs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Why structured outputs?</h2>
        <p className="text-[#a1a1a1] mb-6">
          Agents return free-form text by default, which works for chat but not when you need to use the output programmatically. Structured outputs give you typed data you can pass directly to your application logic, database, or UI components.
        </p>
        <p className="text-[#a1a1a1] mb-6">
          Consider a recipe app where an agent searches the web and brings back recipes. Without structured outputs, you get free-form text that you&apos;d need to parse yourself. With structured outputs, you define the shape you want and get typed data you can use directly in your app.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-[#737373] mb-4">Without structured outputs</h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 font-mono text-sm text-[#a1a1a1]">
              <p>Here&apos;s a classic chocolate chip cookie recipe!</p>
              <p className="mt-2"><strong className="text-[#fafafa]">Chocolate Chip Cookies</strong></p>
              <p className="text-xs mt-1">Prep time: 15 minutes | Cook time: 10 minutes</p>
              <p className="mt-2">Ingredients:</p>
              <p>- 2 1/4 cups all-purpose flour</p>
              <p>- 1 cup butter, softened</p>
              <p className="text-[#525252]">...</p>
            </div>
            <p className="text-xs text-[#525252] mt-3">
              To use this in your app, you&apos;d need to parse out the title, convert &quot;15 minutes&quot; to a number, separate ingredients from instructions, and handle inconsistent formatting.
            </p>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-[#d4a574] mb-4">With structured outputs</h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 font-mono text-sm text-[#a1a1a1]">
              <span className="text-[#fafafa]">{"{"}</span>{"\n"}
              <span className="text-[#9cdcfe]">  &quot;name&quot;</span>: <span className="text-[#ce9178]">&quot;Chocolate Chip Cookies&quot;</span>,{"\n"}
              <span className="text-[#9cdcfe]">  &quot;prep_time_minutes&quot;</span>: <span className="text-[#b5cea8]">15</span>,{"\n"}
              <span className="text-[#9cdcfe]">  &quot;cook_time_minutes&quot;</span>: <span className="text-[#b5cea8]">10</span>,{"\n"}
              <span className="text-[#9cdcfe]">  &quot;ingredients&quot;</span>: [{"\n"}
              <span className="text-[#525252]">    {"{ item, amount, unit }..."}</span>{"\n"}
              {"  ]"}{"\n"}
              <span className="text-[#fafafa]">{"}"}</span>
            </div>
            <p className="text-xs text-[#525252] mt-3">
              Typed data you can use directly in your UI.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Quick Start */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-2">Quick Start</h3>
          <p className="text-[#a1a1a1] mb-6">
            Define a JSON Schema describing the shape of data you want, then pass it to <code className="text-[#d4a574] bg-[#d4a574]/10 px-1.5 py-0.5 rounded">query()</code> via the <code className="text-[#d4a574] bg-[#d4a574]/10 px-1.5 py-0.5 rounded">outputFormat</code> option. When the agent finishes, the result message includes a <code className="text-[#d4a574] bg-[#d4a574]/10 px-1.5 py-0.5 rounded">structured_output</code> field with validated data matching your schema.
          </p>

          <CodeBlock filename="structured-output-quickstart.ts">
            <span className="text-[#c586c0]">import</span>
            <span className="text-[#fafafa]">{" { "}</span>
            <span className="text-[#9cdcfe]">query</span>
            <span className="text-[#fafafa]">{" } "}</span>
            <span className="text-[#c586c0]">from</span>
            <span className="text-[#ce9178]">{" '@anthropic-ai/claude-agent-sdk'"}</span>
            {"\n\n"}
            <span className="text-[#6a9955]">{"// Define the shape of data you want back"}</span>
            {"\n"}
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> schema</span>
            <span className="text-[#fafafa]"> = {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;object&apos;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">properties</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">company_name</span>
            <span className="text-[#fafafa]">: {"{ "}</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;string&apos;</span>
            <span className="text-[#fafafa]">{" }"},</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">founded_year</span>
            <span className="text-[#fafafa]">: {"{ "}</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;number&apos;</span>
            <span className="text-[#fafafa]">{" }"},</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">headquarters</span>
            <span className="text-[#fafafa]">: {"{ "}</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;string&apos;</span>
            <span className="text-[#fafafa]">{" }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"},</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">required</span>
            <span className="text-[#fafafa]">: [</span>
            <span className="text-[#ce9178]">&apos;company_name&apos;</span>
            <span className="text-[#fafafa]">]</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}"}</span>
            {"\n\n"}
            <span className="text-[#c586c0]">for await</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> message</span>
            <span className="text-[#c586c0]"> of</span>
            <span className="text-[#fafafa]"> </span>
            <span className="text-[#dcdcaa]">query</span>
            <span className="text-[#fafafa]">({"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">prompt</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;Research Anthropic and provide key company information&apos;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">outputFormat</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;json_schema&apos;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">schema</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#9cdcfe]">schema</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"})) {"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#6a9955]">{"// The result message contains structured_output with validated data"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">if</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]"> === </span>
            <span className="text-[#ce9178]">&apos;result&apos;</span>
            <span className="text-[#fafafa]"> && </span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">structured_output</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">log</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">structured_output</span>
            <span className="text-[#fafafa]">)</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#6a9955]">{"// { company_name: \"Anthropic\", founded_year: 2021, headquarters: \"San Francisco, CA\" }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}"}</span>
          </CodeBlock>
        </div>

        {/* Type-safe schemas with Zod */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-2">Type-safe schemas with Zod</h3>
          <p className="text-[#a1a1a1] mb-6">
            Instead of writing JSON Schema by hand, use <span className="text-[#d4a574]">Zod</span> to define your schema. Zod generates the JSON Schema for you and lets you parse the response into a fully-typed object with autocomplete and type checking.
          </p>

          <CodeBlock filename="zod-schema.ts">
            <span className="text-[#c586c0]">import</span>
            <span className="text-[#fafafa]">{" { "}</span>
            <span className="text-[#9cdcfe]">z</span>
            <span className="text-[#fafafa]">{" } "}</span>
            <span className="text-[#c586c0]">from</span>
            <span className="text-[#ce9178]">{" 'zod'"}</span>
            {"\n"}
            <span className="text-[#c586c0]">import</span>
            <span className="text-[#fafafa]">{" { "}</span>
            <span className="text-[#9cdcfe]">query</span>
            <span className="text-[#fafafa]">{" } "}</span>
            <span className="text-[#c586c0]">from</span>
            <span className="text-[#ce9178]">{" '@anthropic-ai/claude-agent-sdk'"}</span>
            {"\n\n"}
            <span className="text-[#6a9955]">{"// Define schema with Zod"}</span>
            {"\n"}
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> FeaturePlan</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#9cdcfe]">z</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">object</span>
            <span className="text-[#fafafa]">({"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">feature_name</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#9cdcfe]">z</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">string</span>
            <span className="text-[#fafafa]">(),</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">summary</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#9cdcfe]">z</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">string</span>
            <span className="text-[#fafafa]">(),</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">steps</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#9cdcfe]">z</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">array</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#9cdcfe]">z</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">object</span>
            <span className="text-[#fafafa]">({"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">step_number</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#9cdcfe]">z</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">number</span>
            <span className="text-[#fafafa]">(),</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">description</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#9cdcfe]">z</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">string</span>
            <span className="text-[#fafafa]">(),</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">estimated_complexity</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#9cdcfe]">z</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">enum</span>
            <span className="text-[#fafafa]">([</span>
            <span className="text-[#ce9178]">&apos;low&apos;</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#ce9178]">&apos;medium&apos;</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#ce9178]">&apos;high&apos;</span>
            <span className="text-[#fafafa]">])</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            <span className="text-[#fafafa]">)),</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">risks</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#9cdcfe]">z</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">array</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#9cdcfe]">z</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">string</span>
            <span className="text-[#fafafa]">())</span>
            {"\n"}
            <span className="text-[#fafafa]">{"})"}</span>
            {"\n\n"}
            <span className="text-[#c586c0]">type</span>
            <span className="text-[#4ec9b0]"> FeaturePlan</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#9cdcfe]">z</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">infer</span>
            <span className="text-[#fafafa]">&lt;</span>
            <span className="text-[#c586c0]">typeof</span>
            <span className="text-[#9cdcfe]"> FeaturePlan</span>
            <span className="text-[#fafafa]">&gt;</span>
            {"\n\n"}
            <span className="text-[#6a9955]">{"// Convert to JSON Schema"}</span>
            {"\n"}
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> schema</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#9cdcfe]">z</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">toJSONSchema</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#9cdcfe]">FeaturePlan</span>
            <span className="text-[#fafafa]">)</span>
            {"\n\n"}
            <span className="text-[#6a9955]">{"// Use in query"}</span>
            {"\n"}
            <span className="text-[#c586c0]">for await</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> message</span>
            <span className="text-[#c586c0]"> of</span>
            <span className="text-[#fafafa]"> </span>
            <span className="text-[#dcdcaa]">query</span>
            <span className="text-[#fafafa]">({"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">prompt</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;Plan how to add dark mode support to a React app&apos;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">: {"{ "}</span>
            <span className="text-[#9cdcfe]">outputFormat</span>
            <span className="text-[#fafafa]">: {"{ "}</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;json_schema&apos;</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#9cdcfe]">schema</span>
            <span className="text-[#fafafa]">{" } }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"})) {"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">if</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]"> === </span>
            <span className="text-[#ce9178]">&apos;result&apos;</span>
            <span className="text-[#fafafa]"> && </span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">structured_output</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#6a9955]">{"// Validate and get fully typed result"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> parsed</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#9cdcfe]">FeaturePlan</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">safeParse</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">structured_output</span>
            <span className="text-[#fafafa]">)</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#c586c0]">if</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">parsed</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">success</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> plan</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#4ec9b0]">FeaturePlan</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#9cdcfe]">parsed</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">data</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">log</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#ce9178]">`Feature: ${"{"}</span>
            <span className="text-[#9cdcfe]">plan</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">feature_name</span>
            <span className="text-[#ce9178]">{"}"}`</span>
            <span className="text-[#fafafa]">)</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}"}</span>
          </CodeBlock>

          <div className="mt-6 bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4">
            <p className="text-sm font-medium text-[#737373] mb-2">Benefits</p>
            <ul className="text-sm text-[#a1a1a1] space-y-1">
              <li>- Full type inference with TypeScript</li>
              <li>- Runtime validation with <code className="text-[#d4a574]">safeParse()</code></li>
              <li>- Better error messages</li>
              <li>- Composable, reusable schemas</li>
            </ul>
          </div>
        </div>

        {/* Output Format Configuration */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-4">Output Format Configuration</h3>
          <p className="text-[#a1a1a1] mb-6">
            The <code className="text-[#d4a574] bg-[#d4a574]/10 px-1.5 py-0.5 rounded">outputFormat</code> option accepts an object with:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  <th className="text-left py-3 pr-4 text-[#737373] font-medium">Property</th>
                  <th className="text-left py-3 pr-4 text-[#737373] font-medium">Type</th>
                  <th className="text-left py-3 text-[#737373] font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#1f1f1f]/50">
                  <td className="py-3 pr-4">
                    <code className="text-[#d4a574]">type</code>
                  </td>
                  <td className="py-3 pr-4 text-[#a1a1a1] font-mono text-xs">
                    &quot;json_schema&quot;
                  </td>
                  <td className="py-3 text-[#a1a1a1]">Set to &quot;json_schema&quot; for structured outputs</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">
                    <code className="text-[#d4a574]">schema</code>
                  </td>
                  <td className="py-3 pr-4 text-[#a1a1a1] font-mono text-xs">
                    object
                  </td>
                  <td className="py-3 text-[#a1a1a1]">A JSON Schema object defining your output structure</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[#a1a1a1] mt-4 text-sm">
            The SDK supports standard JSON Schema features including all basic types (object, array, string, number, boolean, null), <code className="text-[#d4a574]">enum</code>, <code className="text-[#d4a574]">const</code>, <code className="text-[#d4a574]">required</code>, nested objects, and <code className="text-[#d4a574]">$ref</code> definitions.
          </p>
        </div>

        {/* Example: TODO Tracking Agent */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-2">Example: TODO Tracking Agent</h3>
          <p className="text-[#a1a1a1] mb-6">
            This example demonstrates how structured outputs work with multi-step tool use. The agent needs to find TODO comments in the codebase, then look up git blame information for each one. It autonomously decides which tools to use (Grep to search, Bash to run git commands) and combines the results into a single structured response.
          </p>

          <CodeBlock filename="todo-tracker.ts">
            <span className="text-[#c586c0]">import</span>
            <span className="text-[#fafafa]">{" { "}</span>
            <span className="text-[#9cdcfe]">query</span>
            <span className="text-[#fafafa]">{" } "}</span>
            <span className="text-[#c586c0]">from</span>
            <span className="text-[#ce9178]">{" '@anthropic-ai/claude-agent-sdk'"}</span>
            {"\n\n"}
            <span className="text-[#6a9955]">{"// Define structure for TODO extraction"}</span>
            {"\n"}
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> todoSchema</span>
            <span className="text-[#fafafa]"> = {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;object&apos;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">properties</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">todos</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;array&apos;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">items</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"        "}</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;object&apos;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"        "}</span>
            <span className="text-[#9cdcfe]">properties</span>
            <span className="text-[#fafafa]">: {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"          "}</span>
            <span className="text-[#9cdcfe]">text</span>
            <span className="text-[#fafafa]">: {"{ "}</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;string&apos;</span>
            <span className="text-[#fafafa]">{" }"},</span>
            {"\n"}
            <span className="text-[#fafafa]">{"          "}</span>
            <span className="text-[#9cdcfe]">file</span>
            <span className="text-[#fafafa]">: {"{ "}</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;string&apos;</span>
            <span className="text-[#fafafa]">{" }"},</span>
            {"\n"}
            <span className="text-[#fafafa]">{"          "}</span>
            <span className="text-[#9cdcfe]">line</span>
            <span className="text-[#fafafa]">: {"{ "}</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;number&apos;</span>
            <span className="text-[#fafafa]">{" }"},</span>
            {"\n"}
            <span className="text-[#fafafa]">{"          "}</span>
            <span className="text-[#9cdcfe]">author</span>
            <span className="text-[#fafafa]">: {"{ "}</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;string&apos;</span>
            <span className="text-[#fafafa]">{" }"},</span>
            {"\n"}
            <span className="text-[#fafafa]">{"          "}</span>
            <span className="text-[#9cdcfe]">date</span>
            <span className="text-[#fafafa]">: {"{ "}</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;string&apos;</span>
            <span className="text-[#fafafa]">{" }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"        }"},</span>
            {"\n"}
            <span className="text-[#fafafa]">{"        "}</span>
            <span className="text-[#9cdcfe]">required</span>
            <span className="text-[#fafafa]">: [</span>
            <span className="text-[#ce9178]">&apos;text&apos;</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#ce9178]">&apos;file&apos;</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#ce9178]">&apos;line&apos;</span>
            <span className="text-[#fafafa]">]</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    }"},</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">total_count</span>
            <span className="text-[#fafafa]">: {"{ "}</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;number&apos;</span>
            <span className="text-[#fafafa]">{" }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"},</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">required</span>
            <span className="text-[#fafafa]">: [</span>
            <span className="text-[#ce9178]">&apos;todos&apos;</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#ce9178]">&apos;total_count&apos;</span>
            <span className="text-[#fafafa]">]</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}"}</span>
            {"\n\n"}
            <span className="text-[#6a9955]">{"// Agent uses Grep to find TODOs, Bash to get git blame info"}</span>
            {"\n"}
            <span className="text-[#c586c0]">for await</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> message</span>
            <span className="text-[#c586c0]"> of</span>
            <span className="text-[#fafafa]"> </span>
            <span className="text-[#dcdcaa]">query</span>
            <span className="text-[#fafafa]">({"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">prompt</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;Find all TODO comments and identify who added them&apos;</span>
            <span className="text-[#fafafa]">,</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">: {"{ "}</span>
            <span className="text-[#9cdcfe]">outputFormat</span>
            <span className="text-[#fafafa]">: {"{ "}</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#ce9178]">&apos;json_schema&apos;</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#9cdcfe]">schema</span>
            <span className="text-[#fafafa]">: </span>
            <span className="text-[#9cdcfe]">todoSchema</span>
            <span className="text-[#fafafa]">{" } }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"})) {"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">if</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]"> === </span>
            <span className="text-[#ce9178]">&apos;result&apos;</span>
            <span className="text-[#fafafa]"> && </span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">structured_output</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> data</span>
            <span className="text-[#fafafa]"> = </span>
            <span className="text-[#9cdcfe]">message</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">structured_output</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">log</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#ce9178]">`Found ${"{"}</span>
            <span className="text-[#9cdcfe]">data</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">total_count</span>
            <span className="text-[#ce9178]">{"}"} TODOs`</span>
            <span className="text-[#fafafa]">)</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}"}</span>
          </CodeBlock>

          <p className="text-sm text-[#525252] mt-4">
            The schema includes optional fields (<code className="text-[#d4a574]">author</code> and <code className="text-[#d4a574]">date</code>) since git blame information might not be available for all files. The agent fills in what it can find and omits the rest.
          </p>
        </div>

        {/* Error Handling */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-4">Error Handling</h3>
          <p className="text-[#a1a1a1] mb-6">
            Structured output generation can fail when the agent cannot produce valid JSON matching your schema. When an error occurs, the result message has a <code className="text-[#d4a574] bg-[#d4a574]/10 px-1.5 py-0.5 rounded">subtype</code> indicating what went wrong.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  <th className="text-left py-3 pr-4 text-[#737373] font-medium">Subtype</th>
                  <th className="text-left py-3 text-[#737373] font-medium">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#1f1f1f]/50">
                  <td className="py-3 pr-4">
                    <code className="text-[#d4a574]">success</code>
                  </td>
                  <td className="py-3 text-[#a1a1a1]">Output was generated and validated successfully</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">
                    <code className="text-[#d4a574]">error_max_structured_output_retries</code>
                  </td>
                  <td className="py-3 text-[#a1a1a1]">Agent couldn&apos;t produce valid output after multiple attempts</td>
                </tr>
              </tbody>
            </table>
          </div>

          <CodeBlock filename="error-handling.ts">
            <span className="text-[#c586c0]">for await</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#c586c0]">const</span>
            <span className="text-[#9cdcfe]"> msg</span>
            <span className="text-[#c586c0]"> of</span>
            <span className="text-[#fafafa]"> </span>
            <span className="text-[#dcdcaa]">query</span>
            <span className="text-[#fafafa]">({"{"} </span>
            <span className="text-[#9cdcfe]">prompt</span>
            <span className="text-[#fafafa]">, </span>
            <span className="text-[#9cdcfe]">options</span>
            <span className="text-[#fafafa]">{" })) {"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  "}</span>
            <span className="text-[#c586c0]">if</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">msg</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">type</span>
            <span className="text-[#fafafa]"> === </span>
            <span className="text-[#ce9178]">&apos;result&apos;</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#c586c0]">if</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">msg</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">subtype</span>
            <span className="text-[#fafafa]"> === </span>
            <span className="text-[#ce9178]">&apos;success&apos;</span>
            <span className="text-[#fafafa]"> && </span>
            <span className="text-[#9cdcfe]">msg</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">structured_output</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#6a9955]">{"// Use the validated output"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">log</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#9cdcfe]">msg</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">structured_output</span>
            <span className="text-[#fafafa]">)</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    "}</span>
            <span className="text-[#fafafa]">{"} "}</span>
            <span className="text-[#c586c0]">else if</span>
            <span className="text-[#fafafa]"> (</span>
            <span className="text-[#9cdcfe]">msg</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#9cdcfe]">subtype</span>
            <span className="text-[#fafafa]"> === </span>
            <span className="text-[#ce9178]">&apos;error_max_structured_output_retries&apos;</span>
            <span className="text-[#fafafa]">) {"{"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#6a9955]">{"// Handle the failure"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"      "}</span>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-[#fafafa]">.</span>
            <span className="text-[#dcdcaa]">error</span>
            <span className="text-[#fafafa]">(</span>
            <span className="text-[#ce9178]">&apos;Could not produce valid output&apos;</span>
            <span className="text-[#fafafa]">)</span>
            {"\n"}
            <span className="text-[#fafafa]">{"    }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"  }"}</span>
            {"\n"}
            <span className="text-[#fafafa]">{"}"}</span>
          </CodeBlock>
        </div>

        {/* Tips for Avoiding Errors */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-4">Tips for Avoiding Errors</h3>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#d4a574]/20 flex items-center justify-center shrink-0">
                <span className="text-[#d4a574] text-sm font-medium">1</span>
              </div>
              <div>
                <p className="font-medium mb-1">Keep schemas focused</p>
                <p className="text-sm text-[#a1a1a1]">
                  Deeply nested schemas with many required fields are harder to satisfy. Start simple and add complexity as needed.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#d4a574]/20 flex items-center justify-center shrink-0">
                <span className="text-[#d4a574] text-sm font-medium">2</span>
              </div>
              <div>
                <p className="font-medium mb-1">Match schema to task</p>
                <p className="text-sm text-[#a1a1a1]">
                  If the task might not have all the information your schema requires, make those fields optional.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#d4a574]/20 flex items-center justify-center shrink-0">
                <span className="text-[#d4a574] text-sm font-medium">3</span>
              </div>
              <div>
                <p className="font-medium mb-1">Use clear prompts</p>
                <p className="text-sm text-[#a1a1a1]">
                  Ambiguous prompts make it harder for the agent to know what output to produce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChapterNavigation currentChapterId="structured-outputs" />
    </LearnLayout>
  );
}
