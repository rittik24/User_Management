import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get('http://localhost:8080/user/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.delete(`http://localhost:8080/user/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== id));
      toast({
        title: 'User deleted.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error deleting user.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.put(`http://localhost:8080/user/users/${selectedUser._id}`, selectedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.map((user) => (user._id === selectedUser._id ? response.data : user)));
      toast({
        title: 'User updated.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: 'Error updating user.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <IconButton
                    icon={<EditIcon />}
                    onClick={() => handleEdit(user)}
                    mr={2}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(user._id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Name"
              value={selectedUser?.name || ''}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
              mb={3}
            />
            <Input
              placeholder="Email"
              value={selectedUser?.email || ''}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserManagement;
