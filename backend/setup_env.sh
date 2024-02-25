if [ "$1" == "override" ]; then
    if [ -f "./wrangler.toml" ]; then
        rm ./wrangler.toml
    fi

    if [ -f "./.env" ]; then
        rm ./env
    fi
else
    if [ -f "./wrangler.toml" ]; then
        echo "wrangler.toml already exists"
        exit 1
    fi

    if [ -f "./.env" ]; then
        echo ".env already exists"
        exit 1
    fi
fi

touch wrangler.toml
touch ./.env

echo "name = \"canvas\"" >> ./wrangler.toml
echo "compatibility_date = \"2024-01-29\"" >> ./wrangler.toml
echo "" >> ./wrangler.toml
echo "[vars]" >> ./wrangler.toml

# write prisma accelerate url
echo "Prisma Accelerate Database URL"
read accelerate
if [[ "$accelerate" =~ ^DATABASE_URL.* ]]; then
    echo "$accelerate" >> ./env
    echo "$accelerate" >> ./wrangler.toml
else
    echo "DATABASE_URL = \"$accelerate\"" >> ./.env
    echo "DATABASE_URL = \"$accelerate\"" >> ./wrangler.toml
fi

# write direct url
echo "Direct Database URL"
read direct
echo "DIRECT_URL = \"$direct\"" >> ./.env
echo "DIRECT_URL = \"$direct\"" >> ./wrangler.toml

echo "
[dev]
port = 8080" >> ./wrangler.toml