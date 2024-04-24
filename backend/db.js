const { createClient } = require('@supabase/supabase-js');

// Initialize a new Supabase client with your Supabase URL and API key
const supabase = createClient('https://rcmjgcvtxwitojqgczej.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjbWpnY3Z0eHdpdG9qcWdjemVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NDE3MDcsImV4cCI6MjAyOTUxNzcwN30.04CcmcDTi6-Q6vjht2t-kmMLtEa9PLdbHrKUZ8k4bu0');

module.exports = supabase;