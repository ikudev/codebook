import type { MarkdownNode, ParsedContent } from '@nuxt/content/types';

function countWords(node: MarkdownNode): number {
  let count = 0;
  if (node.type === 'text' && node.value) {
    count += node.value.split(/\s+/).length; // Split by spaces to count words
  }
  if (Array.isArray(node.children)) {
    node.children.forEach((child: MarkdownNode) => {
      count += countWords(child);
    });
  }
  return count;
}

export const countDocWords = (docs: ParsedContent[]): number => {
  return docs.reduce((count, doc) => {
    doc.body?.children.forEach((node) => {
      count += countWords(node);
    });
    return count;
  }, 0);
};

export const countReadingTime = (
  docNodes: ParsedContent[],
  wordsPerMinute = 200
): number => {
  const wordCount = countDocWords(docNodes);
  return Math.ceil(wordCount / wordsPerMinute);
};
