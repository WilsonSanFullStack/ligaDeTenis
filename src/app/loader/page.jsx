import {currentUser} from '@clerk/nextjs'
import Login from '@/Components/loader';


async function getUser () {
  const user = await currentUser(); 

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/${user.id}`);
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
