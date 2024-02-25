# Canvas v1 REST API

Documentation for API routes, objects, and implementation guidelines.

# Objects

🔒 indicates that objects contain highly sensitive data that is NEVER returned to end users.

✅ indicates that objects contain sensitive data, but CAN be returned to users under specific conditions.

🌏 indicates that objects DO NOT contain sensitive data, but CAN be returned to users under specific conditions.

## 🔒 `User` 

This must be the internal representation of the user. It includes data that should not be returned to end users, such as password hashes.

**Fields**

- `username`: the displayable name of the user used for cosmetic purposes.
    - string
    - min length: 4 chars
    - max length: 32 chars
    - allowed characters: A-Z, a-z, 0-9, dashes (-), underscores (_), periods (.), spaces ( )
- `handle`: the user-selected identifier for the user.
    - string
    - min length: 4 chars
    - max length: 16 chars
    - allowed characters: a-z, 0-9, dashes (-), underscores (_), periods (.)
- `password`: data to control authentication to this user.
    - string
    - **TODO: argon2 or auth library?**
- `tokens`: tokens that this user can use to authenticate as this user.
    - array of `Token` objects
    - max length: 4 `Token`s

**Example object**

```json
{
    "username": "Example Name",
    "handle": "examplename",
    "password": "...",
    "tokens": [
        { Token object },
        ...
    ]
}
```

## 🌏 `PublicUser` 

This object contains user data that is not sensitive.

**Fields**

- `username`: same as in `User`.
- `handle`: same as in `User`.

**Example object**

```json
{
    "username": "Example Name",
    "handle": "examplename"
}
```

## ✅ `Token`

Includes data for authenticating users.

**Fields**

- `token`: the private string that is used to identify a specific user's authenticated session.
    - string
    - length of: 128 chars
    - characters: A-Z, a-z, 0-9, symbols (`~!@#$%^&*()_+-=[]{};':",.<>?/\|`), spaces ( )
- `user`: the `User` that this `Token` applies to, and only this user can use this token to authenticate as that user.
    - `User` object
- `expires`: the date/time when this `Token` can no longer be used to authenticate this user.
    - integer
    - epoch timestamp in milliseconds of UTC/GMT timezone

## 🌏 `Group`

Data containing the members of a group and the group's associated canvas.

**Fields**

- `name`: the displayable name of this group.
    - string
    - min length: 4 chars
    - max length: 32 chars
    - allowed characters: A-Z, a-z, 0-9, dashes (-), underscores (_), periods (.), spaces ( )
- `members`: an array of `PublicUser`s which are members of this `Group` and can make changes to the canvas.
- `canvas`: the shared `Canvas` between members of this group and is associated with this group.
- `turn`: the `PublicUser` member of this `Group` whose turn it is to place a pixel. Once the group is created, it is the group creator's turn first. The turns move in descending alphabetical order.

**Example object**

```json
{
    "name": "Group Name",
    "turn": { PublicUser object },
    "members": [ { PublicUser object } ],
    "canvas": { Canvas object }
}
```

## 🌏 `Canvas`

Representation of a `Group`'s canvas.

**Fields**

- `width`: the number of pixels in this canvas along the x-axis.
- `height`: the number of pixels in this canvas along the y-axis.
- `data`: represents the pixel colors of this canvas.
    - base64 string of byte representation of the image.

**Example object**

```json
{
    "width": 100,
    "height": 100,
    "data": "..."
}
```

## 🌏 `Error`

Includes data about any error that occurred.

**Fields**

- `type`: an identifiable code of the type of error.
    - string of error type
- `reason`: the reason the error occurred, null if unknown.
    - string or null
- `message`: an appropriate message that describes the error.
    - string

**Example object**

```json
{
    "code": "auth/unknown",
    "reason": null,
    "message": "There was an error while authenticating you on our end. Our bad."
}
```

# Error types

## auth

### auth/unknown

Unknown error occurring during authentication.

# Routes

🔒 indicates access with authentication.

✅ indicates access with or without authentication, but responses may be different depending on whether the request is authenticated or not.

🌏 indicates access with or without authentication.

## 🌏 /

**Description**

Health check.

**Access**

No authentication required.

**Request**

- Method: GET
- Headers
    - Accept: application/json

**Limits**

No limits

**Responses**

200 OK
```json
{
    "version": "0.0.1@branch"
}
```

## ✅ /me

**Description**

Returns logged in user.

**Access**

Authentication optional.

**Request**

- Method: POST
- Headers
    - Accept: application/json
- Cookies
    - Authentication cookie

**Limits**

- Rate limit: 5/min
    - to disuade brute forcing

**Responses**

200 OK: User is authenticated successfully.
```json
{
    "user": { User object }
}
```

200 OK: User is not authenticated.
```json
{
    "user": null
}
```

500 Internal Server Error: Error while authenticating the user.
```json
{
    "error": {
        "code": "auth/unknown",
        "reason": null,
        "message": "There was an error while authenticating you on our end. Our bad."
    }
}
```

## 🔒 /me/groups

**Description**

Returns a list of the authenticated user's groups.

**Access**

Authentication required.

**Request**

- Method: POST
- Headers
    - Accept: application/json
- Cookies
    - Authentication cookie

**Limits**

- Rate limit: 5/min
    - to disuade brute forcing

**Responses**

200 OK: User is authenticated successfully, contacts retrieved successfully.
```json
{
    "contacts": [
        { Group object }
    ]
}
```

401 Unauthorized: User is not authenticated.
```json
{
    "error": {
        "code": "contacts/unauthenticated",
        "reason": "must be authenticated to access contacts",
        "message": "Please log in to access your contacts."
    }
}
```

500 Internal Server Error: Error while authenticating the user.
```json
{
    "error": {
        "code": "auth/unknown",
        "reason": null,
        "message": "There was an error while authenticating you on our end. Our bad."
    }
}
```

500 Internal Server Error: Error while getting contacts.
```json
{
    "error": {
        "code": "contacts/unknown",
        "reason": null,
        "message": "There was an error while getting your contacts on our end. Our bad."
    }
}
```