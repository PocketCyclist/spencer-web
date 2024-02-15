export const Quote = (
  { text, author }: { text: string, author?: string }
) => {
  return (
    <div className="my-2">
      <div>
        {author} once said:
      </div>
      <pre>
      {text}
    </pre>
    </div>
  )
}
