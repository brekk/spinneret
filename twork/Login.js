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
            if (form.username !== "" && form.password !== "") {
              scope.dynamic.loggedIn.set(true)
              console.log("<><>", scope.dynamic.loggedIn.get())
              el.replaceWith(
                web.spin(
                  raw.scope,
                  "div",
                  {
                    em: ["login"],
                  },
                  [TworkLogo, "Logged in!"],
                ),
              )
            }
          }),
        }
      },
      [
        TworkLogo,
        //stag("img", { em: ["logo", "retro"], src: "./twork-retro.svg" }, []),
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

const Login = () => stag("main", { em: [""] }, [LoginPanel])

export default Login
