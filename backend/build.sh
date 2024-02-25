#!/bin/bash

# Define the directories
ENDPOINTS_DIR="./src/endpoints"
TS_FILE="./src/index.ts"

# Get a list of all files in the endpoints directory
ENDPOINT_FILES=$(ls "$ENDPOINTS_DIR")

# Create a new index.ts file
echo "import { Hono } from 'hono';
import { DatabaseEnv } from './database';

const app = new Hono();
" > "$TS_FILE"

# Loop through each file in the endpoints directory
for FILE in $ENDPOINT_FILES; do
    # Extract the endpoint name from the file name
    ENDPOINT_NAME=${FILE%.*}

    # Append the import statement for the endpoint file
    echo "import $ENDPOINT_NAME from './endpoints/$ENDPOINT_NAME';" >> "$TS_FILE"

    # Append the route definition
    echo "app.route(\"/$ENDPOINT_NAME\", $ENDPOINT_NAME);" >> "$TS_FILE"
done

# Append the export statement
echo "
export default app;" >> "$TS_FILE"
