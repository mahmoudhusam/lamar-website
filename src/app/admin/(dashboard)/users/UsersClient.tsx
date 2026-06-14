'use client';

import { useState, useTransition } from 'react';
import type { Role } from '@/generated/prisma/client';
import { createUser, updateUser, deleteUser } from './actions';

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
};

const ALL_ROLES: Role[] = ['SUPER_ADMIN', 'PROJECTS_EDITOR', 'CONTENT_EDITOR'];

const ROLE_LABELS: Record<Role, string> = {
  SUPER_ADMIN: 'Super Admin',
  PROJECTS_EDITOR: 'Projects Editor',
  CONTENT_EDITOR: 'Content Editor',
};

const inputStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(20,24,29,0.10)',
  borderRadius: 6,
  color: '#14181D',
  padding: '0.55rem 0.75rem',
  fontSize: '0.85rem',
  width: '100%',
  fontFamily: 'inherit',
  outline: 'none',
};

const btnPrimary: React.CSSProperties = {
  background: '#1A6B60',
  color: '#FFFFFF',
  border: 'none',
  borderRadius: 6,
  padding: '0.55rem 1.25rem',
  fontSize: '0.83rem',
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'inherit',
};

const btnGhost: React.CSSProperties = {
  background: 'transparent',
  color: '#5B6470',
  border: '1px solid rgba(20,24,29,0.10)',
  borderRadius: 6,
  padding: '0.5rem 1rem',
  fontSize: '0.8rem',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

const btnDanger: React.CSSProperties = {
  background: 'transparent',
  color: '#E05C5C',
  border: '1px solid rgba(224,92,92,0.3)',
  borderRadius: 6,
  padding: '0.4rem 0.85rem',
  fontSize: '0.78rem',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

function CreateUserForm({ onDone }: { onDone: () => void }) {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      password: fd.get('password') as string,
      role: fd.get('role') as Role,
    };
    setError('');
    startTransition(async () => {
      try {
        await createUser(data);
        onDone();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to create user.');
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
        }}
      >
        <div>
          <label
            style={{
              color: '#5B6470',
              fontSize: '0.75rem',
              display: 'block',
              marginBottom: '0.35rem',
            }}
          >
            Name
          </label>
          <input
            name="name"
            required
            style={inputStyle}
            placeholder="Full name"
          />
        </div>
        <div>
          <label
            style={{
              color: '#5B6470',
              fontSize: '0.75rem',
              display: 'block',
              marginBottom: '0.35rem',
            }}
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            style={inputStyle}
            placeholder="user@example.com"
          />
        </div>
        <div>
          <label
            style={{
              color: '#5B6470',
              fontSize: '0.75rem',
              display: 'block',
              marginBottom: '0.35rem',
            }}
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            style={inputStyle}
            placeholder="Min. 8 characters"
          />
        </div>
        <div>
          <label
            style={{
              color: '#5B6470',
              fontSize: '0.75rem',
              display: 'block',
              marginBottom: '0.35rem',
            }}
          >
            Role
          </label>
          <select
            name="role"
            required
            style={{ ...inputStyle, appearance: 'none' }}
          >
            {ALL_ROLES.map((r) => (
              <option key={r} value={r}>
                {ROLE_LABELS[r]}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <p style={{ color: '#E05C5C', fontSize: '0.8rem' }}>{error}</p>}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          type="submit"
          disabled={isPending}
          style={{ ...btnPrimary, opacity: isPending ? 0.6 : 1 }}
        >
          {isPending ? 'Creating…' : 'Create User'}
        </button>
        <button type="button" onClick={onDone} style={btnGhost}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function EditUserForm({
  user,
  currentUserId,
  onDone,
}: {
  user: UserRow;
  currentUserId: string;
  onDone: () => void;
}) {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      role: fd.get('role') as Role,
    };
    setError('');
    startTransition(async () => {
      try {
        await updateUser(user.id, data);
        onDone();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to update user.');
      }
    });
  }

  const isSelf = user.id === currentUserId;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        padding: '1rem',
        background: '#F2F5F8',
        borderRadius: 6,
        marginTop: '0.75rem',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
        }}
      >
        <div>
          <label
            style={{
              color: '#5B6470',
              fontSize: '0.75rem',
              display: 'block',
              marginBottom: '0.35rem',
            }}
          >
            Name
          </label>
          <input
            name="name"
            required
            defaultValue={user.name}
            style={inputStyle}
          />
        </div>
        <div>
          <label
            style={{
              color: '#5B6470',
              fontSize: '0.75rem',
              display: 'block',
              marginBottom: '0.35rem',
            }}
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            defaultValue={user.email}
            style={inputStyle}
          />
        </div>
        <div>
          <label
            style={{
              color: '#5B6470',
              fontSize: '0.75rem',
              display: 'block',
              marginBottom: '0.35rem',
            }}
          >
            Role
          </label>
          <select
            name="role"
            required
            defaultValue={user.role}
            disabled={isSelf}
            style={{
              ...inputStyle,
              appearance: 'none',
              opacity: isSelf ? 0.5 : 1,
            }}
          >
            {ALL_ROLES.map((r) => (
              <option key={r} value={r}>
                {ROLE_LABELS[r]}
              </option>
            ))}
          </select>
          {isSelf && (
            <p
              style={{
                color: '#97A0AC',
                fontSize: '0.72rem',
                marginTop: '0.25rem',
              }}
            >
              You cannot change your own role.
            </p>
          )}
        </div>
      </div>
      {error && <p style={{ color: '#E05C5C', fontSize: '0.8rem' }}>{error}</p>}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          type="submit"
          disabled={isPending}
          style={{ ...btnPrimary, opacity: isPending ? 0.6 : 1 }}
        >
          {isPending ? 'Saving…' : 'Save Changes'}
        </button>
        <button type="button" onClick={onDone} style={btnGhost}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function UsersClient({
  users,
  currentUserId,
}: {
  users: UserRow[];
  currentUserId: string;
}) {
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    setDeleteError((prev) => ({ ...prev, [id]: '' }));
    startTransition(async () => {
      try {
        await deleteUser(id);
      } catch (err: unknown) {
        setDeleteError((prev) => ({
          ...prev,
          [id]: err instanceof Error ? err.message : 'Delete failed.',
        }));
      }
    });
  }

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-archivo)',
              color: '#14181D',
              fontSize: '1.5rem',
              fontWeight: 800,
              marginBottom: '0.25rem',
            }}
          >
            Users
          </h1>
          <p style={{ color: '#97A0AC', fontSize: '0.85rem' }}>
            {users.length} user{users.length !== 1 ? 's' : ''}
          </p>
        </div>
        {!showCreate && (
          <button onClick={() => setShowCreate(true)} style={btnPrimary}>
            + New User
          </button>
        )}
      </div>

      {/* Create form */}
      {showCreate && (
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #2ABFA8',
            borderRadius: 8,
            padding: '1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <p
            style={{
              color: '#14181D',
              fontWeight: 600,
              fontSize: '0.9rem',
              marginBottom: '1rem',
            }}
          >
            New User
          </p>
          <CreateUserForm onDone={() => setShowCreate(false)} />
        </div>
      )}

      {/* Users table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              background: '#FFFFFF',
              border: `1px solid ${editingId === user.id ? '#2ABFA8' : 'rgba(20,24,29,0.10)'}`,
              borderRadius: 8,
              padding: '1.25rem 1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Avatar placeholder */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: '#E3E8EE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#5B6470',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    color: '#14181D',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {user.name}
                  {user.id === currentUserId && (
                    <span
                      style={{
                        color: '#97A0AC',
                        fontSize: '0.68rem',
                        fontWeight: 400,
                      }}
                    >
                      (you)
                    </span>
                  )}
                </div>
                <div style={{ color: '#97A0AC', fontSize: '0.78rem' }}>
                  {user.email}
                </div>
              </div>

              {/* Role badge */}
              <span
                style={{
                  background:
                    user.role === 'SUPER_ADMIN'
                      ? 'rgba(42,191,168,0.12)'
                      : '#F2F5F8',
                  border: `1px solid ${user.role === 'SUPER_ADMIN' ? 'rgba(42,191,168,0.3)' : 'rgba(20,24,29,0.10)'}`,
                  color: user.role === 'SUPER_ADMIN' ? '#1A6B60' : '#5B6470',
                  borderRadius: 4,
                  padding: '0.2rem 0.65rem',
                  fontSize: '0.72rem',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {ROLE_LABELS[user.role]}
              </span>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button
                  onClick={() =>
                    setEditingId(editingId === user.id ? null : user.id)
                  }
                  style={{
                    ...btnGhost,
                    color: editingId === user.id ? '#1A6B60' : '#5B6470',
                    borderColor:
                      editingId === user.id
                        ? 'rgba(42,191,168,0.4)'
                        : 'rgba(20,24,29,0.10)',
                  }}
                >
                  {editingId === user.id ? 'Cancel' : 'Edit'}
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  disabled={isPending || user.id === currentUserId}
                  style={{
                    ...btnDanger,
                    opacity: user.id === currentUserId ? 0.3 : 1,
                  }}
                  title={
                    user.id === currentUserId
                      ? 'Cannot delete your own account'
                      : 'Delete user'
                  }
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Delete error */}
            {deleteError[user.id] && (
              <p
                style={{
                  color: '#E05C5C',
                  fontSize: '0.8rem',
                  marginTop: '0.5rem',
                }}
              >
                {deleteError[user.id]}
              </p>
            )}

            {/* Edit form */}
            {editingId === user.id && (
              <EditUserForm
                user={user}
                currentUserId={currentUserId}
                onDone={() => setEditingId(null)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
