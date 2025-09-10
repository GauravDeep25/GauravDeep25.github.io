<!-- FORMSPREE SETUP GUIDE -->

# Setting Up a New Formspree Form

## Step 1: Create a New Form
1. Go to https://formspree.io/
2. Sign up or log in
3. Click "New Form"
4. Choose a form name (e.g., "Portfolio Contact Form")
5. Copy the form ID (it will look like "xpzngjrl" or similar)

## Step 2: Update Environment Variables
Replace the current form ID in your .env file:
```
VITE_FORMSPREE_FORM_ID=your_new_form_id_here
```

## Step 3: Test the Form
1. Restart your development server: npm run dev
2. Try submitting the form
3. Check your email for the test submission

## Step 4: Form Settings (Optional)
In your Formspree dashboard, you can:
- Set up email notifications
- Add custom reply-to addresses
- Configure spam protection
- Set up redirects after submission

## Troubleshooting
- Make sure your domain is added to the allowed domains in Formspree
- Check that you haven't exceeded your plan's submission limits
- Verify the form status is "Active" not "Paused"
