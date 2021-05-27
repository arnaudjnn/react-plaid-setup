import {
  Icon,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react"

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Logo = ({ ...props }) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`
  
  return (
    <Icon width="277" height="325" viewBox="0 0 277 325" animation={animation} {...props}>
      <path d="M203.947 124.771V272.797L276.394 230.983V80.2737L203.947 124.771Z" fill="#33369F"/>
      <path d="M142.008 0L0.466797 77.367L78.057 124.771L141.785 88.9944L203.946 124.771L276.394 80.2739L142.008 0Z" fill="#B7B9E7"/>
      <path d="M0.466797 77.3672L78.281 124.771L77.61 197.89L164.369 244.847L165.263 324.897L0.466797 231.43V77.3672Z" fill="#7173CD"/>
      <path d="M141.785 88.9939L203.947 124.771C203.947 124.771 204.116 198.88 204.116 197.762C208.632 199.932 142.679 165.019 142.679 165.019L141.785 88.9939Z" fill="#7173CD"/>
      <path d="M77.61 197.889L142.679 165.019L141.785 88.9939L78.281 124.771L77.61 197.889Z" fill="#33369F"/>
      <path d="M164.369 244.846L77.61 197.889L142.679 165.019L225.86 209.293L164.369 244.846Z" fill="#B7B9E7"/>
      <path d="M165.263 324.897L224.742 284.872L225.86 209.294L164.369 244.847L165.263 324.897Z" fill="#33369F"/>
      <path d="M8 82.2241C31.2548 96.5346 54.9361 110.635 78.1912 124.945C99.4332 113.094 120.459 101.009 141.702 89.1576C162.497 101.009 183.082 113.082 203.877 124.933C225.119 111.517 246.603 99.0136 267.74 85.6899L141.715 10C97.2182 34.1492 52.7208 58.0748 8 82.2241Z" fill="#B7B9E7"/>
    </Icon>
  )
}
