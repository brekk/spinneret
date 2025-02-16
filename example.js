import { map, pipe, fromPairs, filter, identity } from "ramda"
import blem from "blem"
import { styled } from "@/decorators/styled"
import TworkLogo from "@/components/TworkLogo"
import { handleForm } from "@/form"

import "./sign-up.scss"

const bem = blem("Login")
const stag = styled(bem)

let $loggedIn = false

const LoginPanel = stag("div", { em: "panel" }, [
  stag(
    "form",
    {
      em: "login",
      onSubmit: pipe(handleForm, (form) => {
        console.log("FORM!", form)
        // any non-empty values will submit for now
        if (form.username !== "" && form.password !== "") {
          $loggedIn = true
        }
      }),
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
])

const Login = stag("main", { em: "" }, [
  LoginPanel,
  stag("footer", { em: "footer" }, [
    stag("p", { em: ["footer-section", "main"] }, [
      "Use Twork to find a job and build up your professional network. No additional noise.",
    ]),
    stag(
      "div",
      { em: ["footer-section", "colophon"] },
      stag("ul", { em: "details" }, [
        stag("li", { em: ["detail", "typeface"] }, [
          stag(
            "p",
            {},
            "Website set in &ldquo;Atkinson Hyperlegible Mono&rdquo; &amp; &ldquo;Michroma&rdquo;",
          ),
        ]),
      ]),
    ),
  ]),
])

document.querySelector("#app").append(Login)

window.onload = () => {}
