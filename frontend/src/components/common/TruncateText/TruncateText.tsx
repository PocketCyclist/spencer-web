interface TruncateTextProps {
  text: string
  maxLength?: number
}

const TruncateText: React.FC<TruncateTextProps> = ({
  text,
  maxLength = 200,
}) => {
  if (!text) return null

  const truncated =
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text

  return <>{truncated}</>
}

export default TruncateText
