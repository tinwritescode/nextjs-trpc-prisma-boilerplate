const VerticalSpacing = ({ size = 0 }) => {
  return <div style={{ height: spacing[size] }} />
}

const HorizontalSpacing = ({ size = spacing[0] }) => {
  return <div style={{ width: size }} />
}

const spacing = [2, 4, 8, 16, 20, 24, 28, 32]

export { VerticalSpacing, HorizontalSpacing, spacing }
