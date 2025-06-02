interface MarkdownProps {
  children: string
}

export function Markdown({ children }: MarkdownProps) {
  // Simple markdown renderer for basic text formatting
  const formatText = (text: string) => {
    // Handle bold text
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Handle italic text
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Handle line breaks
    text = text.replace(/\n/g, "<br />")

    return text
  }

  return <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: formatText(children) }} />
}
