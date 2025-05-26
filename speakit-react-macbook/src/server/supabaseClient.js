import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
    global: {
        headers: {'x-application-name': 'speak-it'}
    },
    db: {
        schema: 'public',
    },
    realtime:{
        params: {
            eventsPerSecond: 10,
        }
    }
});

//Override the default fetch errors

const originalFetch= supabase.rest.fetch;
supabase.rest.fetch = async (...args) => {
    try{
        return await originalFetch(...args);
    } catch (error){
        const cleanError = new Error (error.message);
        cleanError.name = error.name;
        cleanError.stack = error.stack;
        throw cleanError;
    }
};

if (!supabase || !supabaseKey) {
    console.error('Supabase environment variables are not defined!');
}

export default supabase;
