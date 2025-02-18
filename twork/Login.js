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
    withState(["error", ""]),
    spin($, t, p, k),
  )(s),
)
const stag = stagWithScope({})
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
            console.log(
              "form.username",
              form.username,
              "<> form.password",
              form.password,
            )

            if (!form.username || !form.password) {
              console.log("firing error for missing fields")
              scope.dynamic.error.set("Email and password are required fields")
              console.log("uhhh", scope.dynamic.error.get())
              el.replaceWith(
                web.spin(
                  raw.scope,
                  raw.kind,
                  { em: ["login", "with-error"] },
                  raw.children,
                ),
              )
            } else {
              scope.dynamic.loggedIn.set(true)
              el.replaceWith(
                web.spin(
                  raw.scope,
                  "div",
                  {
                    em: ["login"],
                  },
                  ["Logged in!"],
                ),
              )
            }
          }),
        }
      },
      [
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
        stagWithScope(
          {
            post: (el, scope) => {
              console.log("@>@>@", el, scope)
              const raw = scope?.dynamic?.error?.get() ?? ""
              console.log("RAW", raw)
              return raw
            },
          },
          "span",
          (raw, el, web) => ({
            em: [
              "error",
              raw?.scope?.dynamic?.error?.get() ? "visible" : "invisible",
            ],
          }),
          [],
        ),
        stag(
          "button",
          {
            type: "submit",
            em: ["button", "login"],
          },
          "Login",
        ),
      ],
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
