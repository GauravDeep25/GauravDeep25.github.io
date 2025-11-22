#!/bin/bash

echo "================================================"
echo "🚀 Supabase Complete Setup Helper"
echo "================================================"
echo ""

SUPABASE_URL="https://cgsqhtwbircvgrimouij.supabase.co"

echo "✨ COMPLETE SETUP: Database + Storage"
echo ""
echo "📋 Here's what to do:"
echo ""
echo "1️⃣  Open this URL in your browser:"
echo "   👉 https://supabase.com/dashboard/project/cgsqhtwbircvgrimouij/sql"
echo ""
echo "2️⃣  Choose ONE of these SQL files:"
echo ""
echo "   Option A (RECOMMENDED): Complete Setup (Database + Storage)"
echo "   📄 setup-complete.sql"
echo "   ✅ Includes: Tables, Data, RLS, Storage Bucket, Storage Policies"
echo ""
echo "   Option B: Step by Step"
echo "   📄 setup-database.sql (run first)"
echo "   📄 setup-storage.sql (run second)"
echo ""
echo "3️⃣  Copy the SQL file to clipboard:"
echo ""
echo "   For Complete Setup:"
echo "   cat setup-complete.sql | xclip -selection clipboard"
echo ""
echo "   OR manually open the file and copy all content"
echo ""
echo "4️⃣  In the Supabase SQL Editor:"
echo "   - Click 'New Query'"
echo "   - Paste the SQL (Ctrl+V)"
echo "   - Click 'Run' (or press Ctrl+Enter)"
echo "   - Wait for 'Success. No rows returned' message"
echo ""
echo "================================================"
echo ""
echo "✅ What will be created:"
echo "   • 7 database tables (hero, about, skills, etc.)"
echo "   • Sample data in all tables"
echo "   • Row Level Security policies"
echo "   • Storage bucket: portfolio-images"
echo "   • Storage access policies (read/write)"
echo ""
echo "================================================"
echo ""

# Check if xclip is installed
if command -v xclip &> /dev/null; then
    read -p "📋 Copy COMPLETE setup SQL to clipboard? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cat setup-complete.sql | xclip -selection clipboard
        echo "✅ SQL copied to clipboard!"
        echo "   Now paste it in the Supabase SQL Editor and click Run"
    fi
else
    echo "💡 TIP: Install xclip for easy clipboard copy:"
    echo "   sudo dnf install xclip"
fi

echo ""
read -p "🌐 Open Supabase SQL Editor in browser? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    xdg-open "https://supabase.com/dashboard/project/cgsqhtwbircvgrimouij/sql" 2>/dev/null || \
    echo "   Please open: https://supabase.com/dashboard/project/cgsqhtwbircvgrimouij/sql"
fi

echo ""
echo "================================================"
echo "📖 Available SQL Files:"
echo "   • setup-complete.sql    - Everything in one (RECOMMENDED)"
echo "   • setup-database.sql    - Just database tables"
echo "   • setup-storage.sql     - Just storage bucket"
echo ""
echo "📚 Detailed instructions:"
echo "   • DATABASE_SETUP_NOW.md"
echo ""
echo "================================================"
