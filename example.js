import { map } from "ramda"
import blem from "blem"
import { styled } from "@/decorators/styled"
import TworkLogo from "@/components/TworkLogo"

import "./sign-up.scss"

const bem = blem("SignUp")
const stag = styled(bem)

const SignUpPanel = stag("div", { em: "panel" }, [
  stag("form", { em: "login" }, [
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
    stag("button", { em: ["button", "login"] }, "Login"),
  ]),
])

const SignUp = stag("main", { em: "" }, [SignUpPanel])

document.querySelector("#app").append(SignUp)
