CREATE TABLE refresh_tokens
(
    id UUID primary KEY,
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP TIME ZONE NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
)
CREATE INDEX idx_refresh_token_user_id ON refresh_tokens(user_id);
