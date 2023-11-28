import {currentUser} from '@clerk/nextjs'
import Login from '@/Components/loader';


async function getUser () {
  try {
    const user = await currentUser(); 
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/${user.id}`);
    console.log(res)
    const data = await res.json()
    console.log('first')
  
    return data
    
  } catch (error) {
    console.log(error)
  }
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
