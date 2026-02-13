#!/bin/bash
# Trend Monitor — Runner
cd "$(dirname "$0")"

echo "🚀 Running Trend Monitor collector..."
python3 collect.py

# Copy today's data to latest
TODAY=$(date +%Y-%m-%d)
if [ -f "data/trend-${TODAY}.json" ]; then
    cp "data/trend-${TODAY}.json" "data/trend-latest.json"
    echo "✅ Copied trend-${TODAY}.json → trend-latest.json"
else
    echo "⚠️  No data file found for ${TODAY}"
fi
