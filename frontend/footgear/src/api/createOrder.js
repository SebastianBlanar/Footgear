export async function createOrder({input}){
  console.log(input);
  const endpoint = "http://localhost:1234/orders/buy"
  const options = {
    method : "POST",
    headers : {
      "Content-Type" : "application/json" 
    },
    body : JSON.stringify(input)
  }
  const res = await fetch(endpoint,options)
  if(! res.ok) throw new Error("Error creating order")
  const order = await res.json()
  return JSON.stringify(order.id)
}