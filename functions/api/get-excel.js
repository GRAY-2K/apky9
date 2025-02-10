export async function onRequest(context) {
  // Get the Excel URL from environment variable
  const excelUrl = context.env.EXCEL_FILE_URL;
  
  // Verify Firebase token
  const authHeader = context.request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const response = await fetch(excelUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch Excel file');
    }

    const data = await response.arrayBuffer();
    return new Response(data, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=data.xlsx'
      }
    });
  } catch (error) {
    return new Response('Error fetching file', { status: 500 });
  }
} 