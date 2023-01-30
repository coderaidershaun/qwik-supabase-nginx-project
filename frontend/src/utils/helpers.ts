import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Check email is valid
export const validateEmail = (email: string) => {
  const regex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/);
  if (regex.test(email)) {
    return true;
  }
  return false;
};

// Check user auth and role via server
// ONLY CALL VIA SERVER SIDE
export const getUserProfile = async (cookie: any) => {
  dotenv.config();

  // Initialize output
  const ret = {
    isSession: false,
    user: {},
    role: "",
  };

  // Extract env for supabase
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  // Run Code
  if (supabaseUrl && supabaseSecretKey) {
    const supabaseServer = createClient(supabaseUrl, supabaseSecretKey);

    // Get JWT
    const jwt = cookie.get("server-access-token")?.value;

    // Authenticate with Supabase
    const { data } = await supabaseServer.auth.getUser(jwt);

    // Structure result and get user profile
    if (data?.user?.id) {
      ret.isSession = true;
      ret.user = data.user;

      const { data: profile } = await supabaseServer
        .from("profiles")
        .select("id, role")
        .eq("id", data.user.id)
        .limit(1)

      if (profile && profile?.[0].role) {
        ret.role = profile[0].role
      }
    }
  }

  // Return result
  return ret
};































// // Get user profile !!!!!!
// export const getUserProfile = async (cookie: any) => {
//   dotenv.config();

//   // Initialize output
//   const userObj: any = {};
//   const ret = {
//     isSession: false,
//     user: userObj,
//     role: "",
//   };

//   // Connect to supabase
//   const supabaseUrl = process.env.SUPABASE_URL;
//   const supabaseSecret = process.env.SUPABASE_SECRET_KEY;
//   if (supabaseUrl && supabaseSecret) {
//     const supabaseServer = createClient(supabaseUrl, supabaseSecret);

//     // Get JWT
//     const jwt = cookie.get("server-access-token")?.value;

//     // Get user
//     const { data } = await supabaseServer.auth.getUser(jwt);

//     // Construct
//     if (data?.user?.id) {
//       ret.isSession = true;
//       ret.user = data.user;

//       // Get role information for user
//       const { data: userData } = await supabaseServer
//         .from("profiles")
//         .select("*")
//         .eq("id", data.user.id)
//         .limit(1);

//       if (userData && userData?.length > 0) {
//         ret.role = userData[0]?.role;
//       }
//     }
//   }

//   // Return result
//   return ret;
// };

// interface SessionData {
//   isSession: boolean;
//   user: any;
//   role: string;
// }

// // Protect route server side
// export const onGet: RequestHandler<SessionData> = async ({
//   response,
//   cookie,
// }) => {
//   const profile = await getUserProfile(cookie);
//   if (!profile?.isSession) {
//     throw response.redirect(rootDomain + "/login");
//   } else {
//     return profile;
//   }
// };

// export default component$(() => {
//   const sessionData = useEndpoint<SessionData>();
//   const isShow = useSignal(false);
//   const nav = useNavigate();

//   // Protect Route
//   useClientEffect$(async () => {
//     const dataSession = await sessionData.value;
//     const isSession = dataSession?.isSession;
//     if (isSession) {
//       isShow.value = true;
//     } else {
//       nav.path = "/login";
//     }
//   });

//   return (
//     <main class="min-h-screen">
//       {isShow.value && (
//         <div class="text-gray-900 p-5">
//           <Create />
//         </div>
//       )}
//     </main>
//   );
// });

// export const head: DocumentHead = {
//   title: "Dashboard",
//   meta: [
//     {
//       name: "description",
//       content: "Members dashboard for Code Raiders",
//     },
//   ],
// };
