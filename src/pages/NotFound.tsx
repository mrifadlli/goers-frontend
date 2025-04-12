export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width:'100%',
        height: '100vh'
      }}
    >
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', }}>
        <h1 style={{ fontFamily:'monospace', marginBottom:'20px' }}>Oops!</h1>
        <img style={{ width:'300px', height:'300px' }} src='/notfound.png' alt='notfound' />
        <h1 style={{ fontFamily:'monospace', marginTop:'20px' }}>Page Not Found</h1>
      </div>
    </div>
  );
}
