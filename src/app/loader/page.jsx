import {auth, currentUser} from '@clerk/nextjs'
import Login from '@/Components/loader';
const { userId } = auth();
if (userId) {

}

async function getUser () {
  const user = await currentUser(); 

  const res = await fetch(`http://localhost:3000/api/user/${user.id}`);
  const data = await res.json()

  return data
}
async function Loader() {
 const data = await getUser()

  return (
    <div className="Container flex justify-center items-center">
      <Login data={data}/>
    </div>
  );
}

export default Loader;
