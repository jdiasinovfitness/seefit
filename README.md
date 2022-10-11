# Introduction 

SeeFit is a app for the fitness area. 

# Getting Started

# Development

## Host

- seefit.inovfitness.com
- tst-seefit.inovfitness.com


## App Structure

### **We have to add a new file or directory?**

In our developments across the plataforms inside Seeplus, we have a main standard related with the repos structure and file positions, that we need to follow:

- **core** is placed inside the root of the ***app*** folder. Here you have two required subfolders: **services** & **components**
    - **services** is used to place your API/middlware communication GLOBAL services or http requests.
    - **components** is used to place the app global components. For example, imagine that you have one main HTML table across the application, you need to create the respective component here in order to be used by the many modules inside this app.
- **modules** is placed inside the root of the **app** folder. Here you define your modules. A module is a group of components, pages and services associated to a app context (ex: Authentication).
  - **"module x"**
    - **_common** is similar to the **core** directory but module oriented. The shared **service** & **components** must be placed inside this directory.
    - **component** is not a shared component, but more like a "page" or parts of a "page" (ex: LoginPage, LoginForm)


[<img src="https://westeurope1-mediap.svc.ms/transform/thumbnail?provider=spo&inputFormat=png&cs=fFNQTw&docid=https%3A%2F%2Finovretail-my.sharepoint.com%3A443%2F_api%2Fv2.0%2Fdrives%2Fb!lpQn6kvLC0uyBlF6tsB2AuY2dnpEDodFtHpP7S69_W3T-BqmdS5FQ4qXHiiSvTh6%2Fitems%2F01PEF6EEGNFYR4IM6RSFC3AFYASPZYYZ3X%3Fversion%3DPublished&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvaW5vdnJldGFpbC1teS5zaGFyZXBvaW50LmNvbUA3ZTVmOWUwZS03OWU2LTQ0MjctODYyNy1iYTlhNWY3Y2I1MWYiLCJpc3MiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAiLCJuYmYiOiIxNjYzNTY3MjAwIiwiZXhwIjoiMTY2MzU4ODgwMCIsImVuZHBvaW50dXJsIjoid2FsYmlTY3RYOHdTQTBMckozWE9uU0FEbVhFNWdwVmI0Mm1TdFBGclpGVT0iLCJlbmRwb2ludHVybExlbmd0aCI6IjEyMCIsImlzbG9vcGJhY2siOiJUcnVlIiwidmVyIjoiaGFzaGVkcHJvb2Z0b2tlbiIsInNpdGVpZCI6IlpXRXlOemswT1RZdFkySTBZaTAwWWpCaUxXSXlNRFl0TlRFM1lXSTJZekEzTmpBeSIsInNpZ25pbl9zdGF0ZSI6IltcImttc2lcIl0iLCJuYW1laWQiOiIwIy5mfG1lbWJlcnNoaXB8am9zZS5kaWFzQGlub3ZyZXRhaWwuY29tIiwibmlpIjoibWljcm9zb2Z0LnNoYXJlcG9pbnQiLCJpc3VzZXIiOiJ0cnVlIiwiY2FjaGVrZXkiOiIwaC5mfG1lbWJlcnNoaXB8MTAwMzdmZmVhOTZiNGZmYkBsaXZlLmNvbSIsInNpZCI6ImFlODA1Y2VjLTI0MDAtNDg1OS1iNWMxLTk0NzMxMWEzYjY2MCIsInR0IjoiMCIsInVzZVBlcnNpc3RlbnRDb29raWUiOiIzIiwiaXBhZGRyIjoiMTg4LjgyLjE1OC4zOCJ9.YU0yM0pIZDFqVnFqRWkvNFZvUXhqamRkWFJncXExWlVZSUY0a2dva1l5bz0&cTag=%22c%3A%7BC4232ECD-D133-4591-B017-0093F38C6777%7D%2C1%22&encodeFailures=1&width=731&height=740&srcWidth=731&srcHeight=740">](https://inovretail-my.sharepoint.com/:i:/p/jose_dias/Ec0uI8Qz0ZFFsBcAk_OMZ3cBR10rlZWu3Rc1Z0cbHK-jtg?e=mC2LEv/)



## Mock & Fake Backend 


## Routing Navigation

Authentication page and subpages lead to the following paths:

### Public paths ( access without token or controlled token)

- {host}/authentication/login
- {host}/authentication/reset
- {host}/authentication/forgot

### Private paths ( access with token )

- {host}/plataform/home/{origin}


## Format

Run this command in ***web*** directory always before a push/commit. We want all the source organized and clean. Our default formatter is the ***prettier***

      npm run format


# Build and Test

Our testing tools is Cypress. Cypress is a next generation front end testing tool built for the modern web.


# Functionality overview

## Authentication Module

### Login

Login page is the first page

### Reset Authentication
Reset Authenticon is the page that the User is redirected from reset email

### Forgot Authentication
Forgot Authentication is the page that the User clicks in Login page when he wants to reset his authentication credentials


## Plataform Module
### Home






