<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }

        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
        }

        .otp-container {
            background-color: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
        }

        .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #2563eb;
            letter-spacing: 4px;
            margin: 10px 0;
        }

        .warning {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            color: #92400e;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #6b7280;
            font-size: 14px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <div class="logo">Your App Name</div>
            <h1>Your Verification Code</h1>
        </div>

        <p>Hello!</p>

        <p>You have requested a verification code to complete your registration. Please use the following code:</p>

        <div class="otp-container">
            <div class="otp-code">{{ $otp }}</div>
            <p><strong>This code will expire in 10 minutes.</strong></p>
        </div>

        <div class="warning">
            <strong>Security Notice:</strong> Never share this code with anyone. Our team will never ask for this code
            via phone, email, or any other communication method.
        </div>

        <p>If you didn't request this code, please ignore this email.</p>

        <p>Best regards,<br>Your App Team</p>

        <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>&copy; {{ date('Y') }} Your App Name. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
