import {auth, currentUser} from '@clerk/nextjs'
import Login from '@/Components/loader';
const { userId } = auth();
if (userId) {
  // Query DB for user specific information or display assets only to logged in users
}
// Get the User object when you need access to the user's information
async function getUser () {
  const user = await currentUser(); 
  // console.log('1user.id')
  // console.log(user.id)
  const res = await fetch(`http://localhost:3000/api/user/${user.id}`);
  const data = await res.json()
  // console.log('2data')
  // console.log(data)
  return data
}
async function Loader() {
 const data = await getUser()
//  console.log('getUser')
//  console.log(data)
  return (
    <div className="Container flex justify-center items-center">
      <Login data={data}/>
    </div>
  );
}

export default Loader;
