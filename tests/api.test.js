const URL = 'http://tzpoosd.com/LAMPAPI/Login.php';

test('Login API returns valid JSON for bad credentials', async () => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login: 'nobody_xyz', password: 'wrong' })
  });

  expect(res.status).toBe(200);
  const data = await res.json();
  expect(data).toEqual({ id: 0, firstName: '', lastName: '', error: 'No Records Found' });
});
