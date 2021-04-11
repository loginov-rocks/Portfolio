# Portfolio

[![Shared CI](https://github.com/loginov-rocks/Portfolio/actions/workflows/shared-ci.yml/badge.svg)](https://github.com/loginov-rocks/Portfolio/actions/workflows/shared-ci.yml)
[![Web App CI](https://github.com/loginov-rocks/Portfolio/actions/workflows/web-app-ci.yml/badge.svg)](https://github.com/loginov-rocks/Portfolio/actions/workflows/web-app-ci.yml)
[![Firebase CI](https://github.com/loginov-rocks/Portfolio/actions/workflows/firebase-ci.yml/badge.svg)](https://github.com/loginov-rocks/Portfolio/actions/workflows/firebase-ci.yml)
[![CD](https://github.com/loginov-rocks/Portfolio/actions/workflows/cd.yml/badge.svg)](https://github.com/loginov-rocks/Portfolio/actions/workflows/cd.yml)

## Development Hints

Due to Firebase Functions
[limitations in handling local dependencies](https://firebase.google.com/docs/functions/handle-dependencies#including_local_nodejs_modules)
([GitHub issue](https://github.com/firebase/firebase-tools/issues/968)) the local `@loginov-rocks/portfolio-shared`
package built, packed to `loginov-rocks-portfolio-shared.tgz` and installed as `tgz` on deploy.
