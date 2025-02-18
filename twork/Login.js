import { map, pipe, fromPairs, filter, identity } from "ramda"
import blem from "blem"
import { styled, styledWithScope } from "@/decorators/styled"
import TworkLogo from "#/twork/Logo"
import { handleForm } from "@/form"
import { withState } from "@/decorators/state"
import { $, inscribe } from "@/function"
import { trace } from "@/side-effect"
import { autobox } from "@/array"
import { spin } from "@/dom"
import selector from "@/selector"

import "#/twork/page-login.scss"

const bem = blem("Login")
let $loggedIn = true
//const stag = styledWithScope(bem, {})
const stagWithScope = inscribe("styledWithBemAndState", (s, t, p, k) =>
  pipe(
    //////
    styledWithScope(bem),
    ////////
    withState(["loggedIn", false]),
    withState(["error", false]),
    spin($, t, p, k),
  )(s),
)
const stag = stagWithScope({})

const loginPanelKids = [
  ...map(
    ([l, f, placeholder]) =>
      stag("label", { em: ["label", f] }, [
        stag("span", { em: ["label-text", f] }, l),
        stag(
          "input",
          {
            em: ["input", f],
            name: f,
            type: f === "password" ? f : "text",
            placeholder,
          },
          [],
        ),
      ]),
    [
      ["Email", "username", "Your email address"],
      ["Password", "password", "Your password"],
    ],
  ),
  stag("span", { em: ["error"] }, []),
  stag(
    "button",
    (raw, el, web) => ({
      type: "submit",
      onClick: (e) => {
        raw.scope.setters.error(false)
      },
      em: ["button", "login"],
    }),
    "Login",
  ),
]

const LoginPanel = stag(
  "div",
  {
    em: ["panel"],
  },
  [
    stag(
      "form",
      (raw, el, web) => {
        const { scope } = raw
        return {
          em: ["login"],
          onSubmit: pipe(handleForm, (form) => {
            // any non-empty values will submit for now
            if ((!form.username || !form.password) && !scope.dynamic.error) {
              const error = "Email and password are required fields"
              scope.setters.error(error)
              const errorEl = selector(bem, ["error"])
              errorEl.innerText = error
            } else if (form.username && form.password) {
              scope.setters.loggedIn(true)
              el.replaceWith(
                web.spin(
                  raw.scope,
                  "div",
                  {
                    em: ["logged-in"],
                  },
                  ["Logged in!"],
                ),
              )
            }
          }),
        }
      },
      loginPanelKids,
    ),
  ],
)

const Login = () =>
  stag("main", { em: [""] }, [
    TworkLogo,
    LoginPanel,
    stag("a", { href: "#", em: ["link"] }, "Forgot your password?"),
  ])

export default Login
