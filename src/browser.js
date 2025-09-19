import { attr, remap as remapAttribute } from "@/attribute"
import * as constants from "@/constants"
import * as dom from "@/dom"
import * as events from "@/events"
import { $, inscribe } from "@/function"
import * as json from "@/json"
import * as object from "@/object"
import * as selector from "@/selector"
import * as sideEffect from "@/side-effect"
import * as string from "@/string"
import * as style from "@/style"
import * as transform from "@/transform"

import * as literal from "@/decorators/literal"
import * as styled from "@/decorators/styled"

import * as canvas from "@/canvas"

import * as form from "@/form"

export default {
  ...dom,
  ...sideEffect,
  ...style,
  attr,
  remapAttribute,
  constants,
  dom,
  events,
  $,
  inscribe,
  json,
  object,
  selector,
  string,
  transform,
  decorators: { literal, styled },
  canvas,
  form,
}
