import { useUserAuth } from "./_utils/auth-context";

export default function Page() {


const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
 
const handleSignIn = () => {
    gitHubSignIn();
};

const handleSignOut = () => {
    firebaseSignOut();
}

return (
    <main>
        User: 
    </main>
);


}