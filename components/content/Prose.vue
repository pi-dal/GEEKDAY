<template>
  <ContentRendererMarkdown
    v-slot="{ data }"
    :value="value"
  >
    <article class="prose prose-invert prose-lg max-w-none
                 prose-headings:font-['Press_Start_2P'] prose-headings:text-[#22c55e] prose-headings:mb-6
                 prose-h1:text-3xl prose-h1:pb-4 prose-h1:border-b-4 prose-h1:border-[#22c55e]
                 prose-h2:text-2xl prose-h2:mt-8
                 prose-h3:text-xl
                 prose-p:font-['zpix'] prose-p:text-gray-300 prose-p:leading-relaxed
                 prose-a:text-[#22c55e] prose-a:no-underline prose-a:font-bold prose-a:border-b-2 prose-a:border-dashed prose-a:border-[#22c55e]/50 hover:prose-a:border-solid hover:prose-a:bg-[#22c55e]/10
                 prose-code:bg-[#1a1a1a] prose-code:text-[#22c55e] prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:border-2 prose-code:border-[#22c55e]/30
                 prose-pre:bg-[#0a0a0a] prose-pre:border-4 prose-pre:border-[#22c55e] prose-pre:rounded-lg prose-pre:p-6 prose-pre:shadow-lg prose-pre:shadow-[#22c55e]/10
                 prose-pre-code:text-[#e5e7eb] prose-pre-code:bg-transparent prose-pre-code:border-none prose-pre-code:p-0
                 prose-blockquote:border-l-4 prose-blockquote:border-[#22c55e] prose-blockquote:bg-[#1a1a1a] prose-blockquote:p-4 prose-blockquote:my-6 prose-blockquote:rounded-r
                 prose-blockquote p:text-gray-300
                 prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-[#22c55e] prose-li:mb-2
                 prose-strong:text-[#22c55e] prose-strong:font-bold
                 prose-hr:border-4 prose-hr:border-[#22c55e] prose-hr:my-12 prose-hr:opacity-50
                 prose-img:rounded-lg prose-img:border-4 prose-img:border-[#22c55e] prose-img:shadow-lg prose-img:shadow-[#22c55e]/20
                 prose-table:border-4 prose-table:border-[#22c55e]
                 prose-thead:border-b-4 prose-thead:border-[#22c55e]
                 prose-th:text-[#22c55e] prose-th:font-bold prose-th:text-left
                 prose-tr:border-b-2 prose-tr:border-[#22c55e]/20
                 prose-td:border-b-2 prose-td:border-[#22c55e]/10
                 prose-td:text-gray-300">
      <slot />
    </article>
  </ContentRendererMarkdown>
</template>

<script setup lang="ts">
defineProps({
  value: {
    type: Object,
    required: true
  }
})
</script>
