import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

function Users() {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Người dùng
            </Typography>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        Danh sách người dùng sẽ được hiển thị ở đây.
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Users;
