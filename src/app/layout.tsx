export const metadata = {
  title: "SnippetHub Backend API",
  description: "RESTful API Server for SnippetHub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#0A0A0A" }}>{children}</body>
    </html>
  );
}

