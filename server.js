import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Fake data generators
const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emily', 'Chris', 'Lisa', 'Tom', 'Anna', 'James', 'Maria', 'Robert', 'Linda', 'Michael'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'];
const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'company.com', 'email.com', 'test.com'];

// In-memory storage for users
let users = [];
let userIdCounter = 1;

// Utility functions
function generatePassword(length = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function generateUser(firstName = null, lastName = null, email = null) {
    const fName = firstName || firstNames[Math.floor(Math.random() * firstNames.length)];
    const lName = lastName || lastNames[Math.floor(Math.random() * lastNames.length)];
    const userEmail = email || `${fName.toLowerCase()}.${lName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
    const password = generatePassword();
    
    const user = {
        id: userIdCounter++,
        firstName: fName,
        lastName: lName,
        email: userEmail,
        password: password,
        createdAt: new Date().toISOString(),
        isActive: true,
        lastLogin: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : null
    };
    
    users.push(user);
    return user;
}

// API Routes

// GET /api/users/random - Generate a single random user
app.get('/api/users/random', (req, res) => {
    try {
        const user = generateUser();
        res.json({
            success: true,
            data: user,
            message: "Random user generated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error generating user",
            error: error.message
        });
    }
});

// GET /api/users/batch - Generate multiple users
app.get('/api/users/batch', (req, res) => {
    try {
        const count = Math.min(parseInt(req.query.count) || 5, 50);
        const batchUsers = [];
        
        for (let i = 0; i < count; i++) {
            batchUsers.push(generateUser());
        }
        
        res.json({
            success: true,
            data: batchUsers,
            count: batchUsers.length,
            message: `Generated ${batchUsers.length} users successfully`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error generating batch users",
            error: error.message
        });
    }
});

// GET /api/users - Get all users
app.get('/api/users', (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 10, 100);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        const paginatedUsers = users.slice(startIndex, endIndex);
        
        res.json({
            success: true,
            data: paginatedUsers,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(users.length / limit),
                totalUsers: users.length,
                hasNext: endIndex < users.length,
                hasPrev: startIndex > 0
            },
            message: "Users retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving users",
            error: error.message
        });
    }
});

// GET /api/users/:id - Get user by ID
app.get('/api/users/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = users.find(u => u.id === userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        res.json({
            success: true,
            data: user,
            message: "User retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving user",
            error: error.message
        });
    }
});

// POST /api/users/create - Create a specific user
app.post('/api/users/create', (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        
        // Check if email already exists
        if (email && users.find(u => u.email === email)) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }
        
        const user = generateUser(firstName, lastName, email);
        
        res.status(201).json({
            success: true,
            data: user,
            message: "User created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating user",
            error: error.message
        });
    }
});

// POST /api/auth/login - Validate credentials
app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            res.json({
                success: true,
                valid: true,
                data: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                message: "Credentials are valid"
            });
        } else {
            res.status(401).json({
                success: false,
                valid: false,
                message: "Invalid credentials"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error validating credentials",
            error: error.message
        });
    }
});

// POST /api/auth/signup - Create new user account
app.post('/api/auth/signup', (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        
        // Check if email already exists
        if (users.find(u => u.email === email)) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }
        
        const user = {
            id: userIdCounter++,
            firstName,
            lastName,
            email,
            password, // In production, hash this password
            createdAt: new Date().toISOString(),
            isActive: true,
            lastLogin: null
        };
        
        users.push(user);
        
        res.status(201).json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            message: "Account created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating account",
            error: error.message
        });
    }
});
// PUT /api/users/:id/reset-password - Reset user password
app.put('/api/users/:id/reset-password', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = users.find(u => u.id === userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        const newPassword = generatePassword();
        user.password = newPassword;
        
        res.json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                newPassword: newPassword,
                resetToken: Math.random().toString(36).substring(2, 15),
                expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString()
            },
            message: "Password reset successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error resetting password",
            error: error.message
        });
    }
});

// POST /api/users/reset-password-by-email - Reset password by email
app.post('/api/users/reset-password-by-email', (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }
        
        const user = users.find(u => u.email === email);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User with this email not found"
            });
        }
        
        const newPassword = generatePassword();
        user.password = newPassword;
        
        res.json({
            success: true,
            data: {
                email: email,
                newPassword: newPassword,
                resetToken: Math.random().toString(36).substring(2, 15),
                expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString()
            },
            message: "Password reset successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error resetting password",
            error: error.message
        });
    }
});

// DELETE /api/users/:id - Delete user
app.delete('/api/users/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        const deletedUser = users.splice(userIndex, 1)[0];
        
        res.json({
            success: true,
            data: deletedUser,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting user",
            error: error.message
        });
    }
});
// POST /api/auth/forgot-password - Send password reset email
app.post('/api/auth/forgot-password', (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }
        
        const user = users.find(u => u.email === email);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User with this email not found"
            });
        }
        
        // In production, send actual email here
        const resetToken = Math.random().toString(36).substring(2, 15);
        
        res.json({
            success: true,
            message: "Password reset email sent successfully",
            // In production, don't return the token
            resetToken: resetToken
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error sending password reset email",
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        totalUsers: users.length
    });
});

// Generate some initial users
for (let i = 0; i < 20; i++) {
    generateUser();
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Fake User API Server running on http://localhost:${PORT}`);
    console.log(`📊 Generated ${users.length} initial users`);
    console.log(`\n📋 Available endpoints:`);
    console.log(`   GET  /api/users/random`);
    console.log(`   GET  /api/users/batch?count=5`);
    console.log(`   GET  /api/users?page=1&limit=10`);
    console.log(`   GET  /api/users/:id`);
    console.log(`   POST /api/users/create`);
    console.log(`   POST /api/auth/login`);
    console.log(`   POST /api/auth/signup`);        // ADD THIS LINE
    console.log(`   POST /api/auth/forgot-password`); // ADD THIS LINE
    console.log(`   PUT  /api/users/:id/reset-password`);
    console.log(`   POST /api/users/reset-password-by-email`);
    console.log(`   DELETE /api/users/:id`);    
    console.log(`   GET  /health`);
});

export default app;