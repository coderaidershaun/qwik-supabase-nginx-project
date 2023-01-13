import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://somgwzxrlvjonciazklm.supabase.co";
const supabaseAnonPublic = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvbWd3enhybHZqb25jaWF6a2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMxNzQzMDMsImV4cCI6MTk4ODc1MDMwM30.FV5Gh4bG09RtPImVBdZgcVD3MtDC-taSoo4hOyVTePo"

export const supabase = createClient(supabaseUrl, supabaseAnonPublic);
