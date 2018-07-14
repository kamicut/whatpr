🕵️‍♂️ whatpr
=======

Queries on the WRS2 path rows:
- Get path rows & geometries for a given boundary
- Get geometry for a given (path, row)

Documentation: https://whatpr.now.sh/documentation

## Deployment
Deployments are run using Docker and pushed to `now.sh`

## Development
### Requirements
- make
- spatialite (`brew install spatialite`)
- Node 8+

### Rebuilding the db
`make`

### Tests
`npm test`