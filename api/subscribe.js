// api/subscribe.js
import { createClient } from '@supabase/supabase-io'; // Adjust this import statement to match your exact database helper file if you have one

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  try {
    // Insert the user email into our table
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email: email, status: 'regular' }]);

    if (error) {
      // Handle the case where the email is already subscribed
      if (error.code === '23505') {
        return res.status(400).json({ error: 'This email is already subscribed!' });
      }
      throw error;
    }

    return res.status(200).json({ message: 'Success! You are now subscribed to WorldConnect updates.' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error, please try again later.' });
  }
}