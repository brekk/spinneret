// DIRECT EXPORT
export * from "@/array"
export * from "@/attribute"
export * from "@/canvas"
export * from "@/constants"
export * from "@/dom"
export * from "@/event-system"
export * from "@/events"
export * from "@/form"
export * from "@/function"
export * from "@/json"
export * from "@/object"
export * from "@/selector"
export * from "@/side-effect"
export * from "@/string"
export * from "@/style"
export * from "@/transform"
export * from "@/decorators/literal"
export * from "@/decorators/state"
export * from "@/decorators/styled"

// DEFAULT EXPORT
import * as constants from "@/constants"
import { spin, tag, svg, mount } from "@/dom"
import { inscribe, isPlaceholder, getSignature, isMarked, $ } from "@/function"
import { makeSelector, selector } from "@/selector"

// DECORATORS
import {
  literalTagWithScope,
  literalSvgWithScope,
  literalTag,
  literalSvg,
} from "@/decorators/literal"
import { withState } from "@/decorators/state"
import { styledWithScope, styled, base } from "@/decorators/styled"

export default {
  constants,
  spin,
  tag,
  svg,
  mount,
  inscribe,
  isPlaceholder,
  getSignature,
  isMarked,
  $,
  makeSelector,
  selector,
  decorators: {
    literal: {
      tagWithScope: literalTagWithScope,
      svgWithScope: literalSvgWithScope,
      tag: literalTag,
      svg: literalSvg,
    },
    state: { withState },
    styled: {
      withScope: styledWithScope,
      styled,
      base,
    },
  },
}
