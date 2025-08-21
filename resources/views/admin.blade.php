<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Invite Users</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 class="text-2xl font-bold text-gray-900 mb-6">Admin Panel</h1>
            <h2 class="text-lg font-semibold text-gray-700 mb-4">Invite New User</h2>
            
            <form id="inviteForm" class="space-y-4">
                <div>
                    <label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" id="first_name" name="first_name" required 
                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                
                <div>
                    <label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" id="last_name" name="last_name" required 
                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" required 
                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                
                <button type="submit" 
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Send Invitation
                </button>
            </form>
            
            <div id="result" class="mt-4"></div>
            
            <div class="mt-6 pt-6 border-t border-gray-200">
                <h3 class="text-sm font-medium text-gray-700 mb-2">Test Links:</h3>
                <div class="space-y-2">
                    <a href="/" class="block text-sm text-indigo-600 hover:text-indigo-500">→ Main Application</a>
                    <a href="/magic-link" class="block text-sm text-indigo-600 hover:text-indigo-500">→ Magic Link Flow</a>
                    <a href="/otp" class="block text-sm text-indigo-600 hover:text-indigo-500">→ OTP Flow</a>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.getElementById('inviteForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = {
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                email: formData.get('email')
            };
            
            try {
                const response = await fetch('/api/invite', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    document.getElementById('result').innerHTML = `
                        <div class="bg-green-50 border border-green-200 rounded-md p-4">
                            <div class="text-sm text-green-700">
                                <strong>Success!</strong> Invitation sent to ${data.email}
                            </div>
                        </div>
                    `;
                    e.target.reset();
                } else {
                    document.getElementById('result').innerHTML = `
                        <div class="bg-red-50 border border-red-200 rounded-md p-4">
                            <div class="text-sm text-red-700">
                                <strong>Error:</strong> ${result.message}
                            </div>
                        </div>
                    `;
                }
            } catch (error) {
                document.getElementById('result').innerHTML = `
                    <div class="bg-red-50 border border-red-200 rounded-md p-4">
                        <div class="text-sm text-red-700">
                            <strong>Error:</strong> ${error.message}
                        </div>
                    </div>
                `;
            }
        });
    </script>
</body>
</html>
