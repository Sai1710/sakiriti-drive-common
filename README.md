# @sakiriti/drive-common

Shared code for the drive services: Mongoose schemas/models, types, API utils and the auth middleware.

## Install in a service

```bash
npm i @sakiriti/drive-common
```

`express` and `mongoose` are peer dependencies, so the service provides them.
Don't use `npm link` or `npm i ../drive-common` for local testing: a symlinked
install resolves `mongoose` from `drive-common/node_modules`, so the models
register on a different mongoose instance than the one your service connects
with, and queries hang forever. Test local changes with `npm pack` and install
the generated `.tgz` instead.

## Releasing a new version

```bash
npm version patch   # or minor / major
npm publish
```

## Usage

```ts
import {
  createAuthMiddleware,
  errorHandler,
  asyncHandler,
  ApiError,
  ApiResponse,
  userModel,
  fileModel,
  FILE_TYPE,
} from "@sakiriti/drive-common";

// Stateless: verifies the JWT and sets req.auth = { _id, email }
const requireAuth = createAuthMiddleware({ accessTokenSecret: ACCESS_TOKEN_SECRET });

// Also loads the user document into req.user (needs access to the users DB)
const requireUser = createAuthMiddleware({
  accessTokenSecret: ACCESS_TOKEN_SECRET,
  loadUser: true,
});

router.get("/files", requireAuth, asyncHandler(async (req, res) => {
  const files = await fileModel.find({ user_id: req.auth!._id, parent_id: null });
  res.json(new ApiResponse(200, files));
}));

app.use(errorHandler);
```

## What's inside

| Area | Exports |
| --- | --- |
| Models | `userModel`, `fileModel`, `userSchema`, `fileSchema` |
| Types | `TUser`, `TUserDocument`, `TUserMethods`, `TPublicUser`, `TFile`, `TFileDocument`, `TFileType`, `TUploadStatus`, `TAccessTokenPayload`, `TRefreshTokenPayload` |
| Constants | `FILE_TYPE`, `UPLOAD_STATUS`, token expiries, model names |
| Middleware | `createAuthMiddleware` (adds `req.auth` / `req.user` to Express `Request`) |
| Utils | `ApiError`, `ApiResponse`, `asyncHandler`, `errorHandler`, `signAccessToken`, `signRefreshToken`, `verifyAccessToken`, `verifyRefreshToken` |
