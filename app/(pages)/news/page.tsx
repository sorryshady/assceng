import Wrapper from "@/components/custom/wrapper";

export default function News() {
  return (
    <Wrapper>
      <h1 className="text-5xl font-bold text-center">News Feed</h1>
      <div >
        <div>
          <p>News 1</p>
          <p>News 2</p>
          <p>News 3</p>
          <p>News 4</p>
        </div>
        <div>
          <h3>Recent Posts</h3>
          <p>News 5</p>
          <p>News 6</p>
          <p>News 7</p>
        </div>
      </div>
    </Wrapper>
  );
}
