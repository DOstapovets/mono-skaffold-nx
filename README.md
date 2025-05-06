# skaffold-p-m

## Yarn Workspaces Project

This project uses Yarn Workspaces to manage multiple packages in a monorepo structure.

### Project Structure

- `client/`: Frontend application
- `server/`: Backend application
- `packages/`: Shared packages and libraries

### Available Scripts

- `yarn start`: Start the server
- `yarn client`: Start the client
- `yarn dev`: Start both client and server concurrently
- `yarn test`: Run tests across all workspaces

### Adding a new package

To add a new shared package:

1. Create a new directory in the `packages/` folder
2. Initialize it with `yarn init`
3. Reference it in other workspaces with the package name in dependencies
