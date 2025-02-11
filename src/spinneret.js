export { tag, svgTag, svg } from "@/dom"
export { attr } from "@/attribute"
export { isPlaceholder, getSignature, isMarked, inscribe, $ } from "@/function"

// in all likelihood this should be a separate export / package
import Debug from "@/components/Debug"
import Disclosable from "@/components/Disclosable"
import Heading from "@/components/Heading"
import Flex from "@/components/Flex"
import Logo from "@/components/Logo"

export const components = {
  Debug,
  Disclosable,
  Heading,
  Flex,
  Logo,
}
