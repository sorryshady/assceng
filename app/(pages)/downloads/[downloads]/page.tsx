import FileActions from "@/components/custom/file-actions";
import Wrapper from "@/components/custom/wrapper";
import { Separator } from "@/components/ui/separator";
import { downloadsList } from "@/lib/interface";
import { client } from "@/lib/sanity";
import { heading, toCamelCase } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

type Params = Promise<{ downloads: string }>;

async function getData(downloadType: string) {
  const query = `*[_type == "downloads" && category == '${downloadType}'] {
    title,
    "fileUrl": file.asset->url
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Downloads({ params }: { params: Params }) {
  const { downloads } = await params;
  const downloadsValue = toCamelCase(downloads);
  const data: downloadsList[] = await getData(downloadsValue);

  return (
    <Wrapper>
      <h1 className="text-5xl font-bold text-center">Downloads Page</h1>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-center">{heading(downloads)}</h2>
        {data.length ? (
          <div className="space-y-4">
            {data.map((download) => (
              <div
                key={download.title}
                className="space-y-4 p-4 border rounded-lg"
              >
                <p className="text-lg font-semibold">{download.title}</p>
                <Separator />
                <FileActions
                  fileUrl={download.fileUrl}
                  title={download.title}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">No downloads available</div>
        )}
      </div>
    </Wrapper>
  );
}
