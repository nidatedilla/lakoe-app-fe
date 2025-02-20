import { Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Field } from './ui/field';

import { createBank } from '../hooks/use-bank';
import { useGetMe } from '../hooks/use-find-me';
import { Bank } from '../types/type-user';
import { useDialog } from '../store/dialog-store';

export default function DialogCreateBank() {
  const { User } = useGetMe();
  const { isOpen, closeDialog, openDialog } = useDialog();

  const { mutateAsync: createBankAcc, isPending: loading } = createBank();
  const [bank, setBank] = useState<string>(
    User?.stores?.bank_accounts?.bank || ''
  );
  const [accNum, setAccNum] = useState<string>(
    User?.stores?.bank_accounts?.acc_num || ''
  );
  const [accName, setAccName] = useState<string>(
    User?.stores?.bank_accounts?.acc_name || ''
  );

  const handleSubmit = async () => {
    const payload: Bank = {
      userId: User?.id || '',
      bank: bank,
      acc_name: accName,
      acc_num: accNum,
      storeId: User?.stores?.id || '',
    };
    try {
      const res = await createBankAcc(payload);
      closeDialog();
      console.log('res', res);
    } catch (err: any) {
      console.error('Error creating location:', err);
    }
  };

  return (
    <DialogRoot open={isOpen}>
      <Button
        bg={'blue.500'}
        size={'sm'}
        borderRadius={'full'}
        height={'30px'}
        color={'white'}
        onClick={() => openDialog()}
      >
        {User?.stores?.bank_accounts == null ||
        User.stores?.bank_accounts == undefined
          ? 'Tambah Akun Bank'
          : 'Edit Akun Bank'}
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {' '}
            {User?.stores?.bank_accounts == null ||
            User.stores?.bank_accounts == undefined
              ? ' Buat akun bank baru'
              : 'Edit Akun Bank'}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={4}>
            <Field label="Nama Bank" required>
              <Input
                onChange={(e) => setBank(e.target.value)}
                value={bank}
                placeholder="Cth. BCA"
              />
            </Field>
            <Field label="Nomor Rekening" required>
              <Input
                onChange={(e) => setAccNum(e.target.value)}
                value={accNum}
                placeholder="Cth. 924343"
              />
            </Field>
            <Field label="Nama Akun Bank" required>
              <Input
                onChange={(e) => setAccName(e.target.value)}
                value={accName}
                placeholder="Cth. ucok baba"
              />
            </Field>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              onClick={() => closeDialog()}
              variant="outline"
              borderRadius={'full'}
            >
              Batalkan
            </Button>
          </DialogActionTrigger>
          <Button
            bg={'blue.500'}
            borderRadius={'full'}
            onClick={handleSubmit}
            loading={loading}
          >
            Simpan
          </Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={() => closeDialog()} />
      </DialogContent>
    </DialogRoot>
  );
}