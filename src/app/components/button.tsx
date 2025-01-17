"use client";

const Button = () => {
  const handleClick = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}`);
    console.log(res);
  };
  return <button onClick={handleClick}>test</button>;
};

export default Button;
